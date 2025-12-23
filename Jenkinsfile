
pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:

  - name: node
    image: mirror.gcr.io/library/node:20
    command: ['cat']
    tty: true

  - name: sonar-scanner
    image: sonarsource/sonar-scanner-cli
    command: ['cat']
    tty: true

  - name: kubectl
    image: lachlanevenson/k8s-kubectl:latest
    command:
      - sh
      - -c
      - cat
    tty: true
    env:
      - name: KUBECONFIG
        value: /kube/config
    volumeMounts:
      - name: kubeconfig-secret
        mountPath: /kube/config
        subPath: kubeconfig

  - name: dind
    image: docker:dind
    args:
      - "--storage-driver=overlay2"
      - "--insecure-registry=nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
    securityContext:
      privileged: true
    env:
      - name: DOCKER_TLS_CERTDIR
        value: ""

  volumes:
    - name: kubeconfig-secret
      secret:
        secretName: kubeconfig-secret
'''
        }
    }

    stages {

        /* ============================
           FRONTEND BUILD (FIXED)
           ============================ */
        stage('Install + Build Frontend') {
            steps {
                dir('frontend') {
                    container('node') {
                        sh '''
                            echo "Setting VITE_BACKEND_URL for build..."
                            export VITE_BACKEND_URL=https://suvarnarup-ecommerce.imcc.com/api

                            echo "VITE_BACKEND_URL=${VITE_BACKEND_URL}"

                            npm install
                            npm run build
                        '''
                    }
                }
            }
        }

        /* ============================
           BACKEND INSTALL
           ============================ */
        stage('Install Backend') {
            steps {
                dir('backend') {
                    container('node') {
                        sh 'npm install'
                    }
                }
            }
        }

        /* ============================
           DOCKER IMAGE BUILD
           ============================ */
        stage('Build Docker Images') {
            steps {
                container('dind') {
                    sh '''
                        docker build -t ecommerce-frontend:latest -f frontend/Dockerfile frontend/
                        docker build -t ecommerce-backend:latest -f backend/Dockerfile backend/
                    '''
                }
            }
        }

        /* ============================
           SONARQUBE
           ============================ */
        stage('SonarQube Analysis') {
            steps {
                container('sonar-scanner') {
                    sh '''
                        sonar-scanner \
                            -Dsonar.projectKey=ecommerce_project \
                            -Dsonar.sources=frontend,backend \
                            -Dsonar.host.url=http://my-sonarqube-sonarqube.sonarqube.svc.cluster.local:9000 \
                            -Dsonar.token=sqp_6c8cff2d8f8ba5ac58c1fcd88215b42648d4c60d
                    '''
                }
            }
        }

        /* ============================
           LOGIN TO NEXUS
           ============================ */
        stage('Login to Nexus Registry') {
            steps {
                container('dind') {
                    sh '''
                        docker login \
                            http://nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085 \
                            -u student -p Imcc@2025
                    '''
                }
            }
        }

        /* ============================
           PUSH IMAGES TO NEXUS
           ============================ */
        stage('Push to Nexus') {
            steps {
                container('dind') {
                    sh '''
                        docker tag ecommerce-frontend:latest \
                          nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/shreya_joshi_repo/ecommerce-frontend:v1

                        docker tag ecommerce-backend:latest \
                          nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/shreya_joshi_repo/ecommerce-backend:v1

                        docker push nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/shreya_joshi_repo/ecommerce-frontend:v1
                        docker push nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/shreya_joshi_repo/ecommerce-backend:v1
                    '''
                }
            }
        }

        /* ============================
           DEPLOY TO KUBERNETES
           ============================ */
        stage('Deploy to Kubernetes') {
            steps {
                container('kubectl') {
                    sh '''
                        echo "======= Applying Deployment YAML ======="
                        kubectl apply -f k8s/deployment.yaml

                        echo "======= Applying Service YAML ======="
                        kubectl apply -f k8s/service.yaml

                        kubectl rollout restart deployment/ecommerce-backend -n 2401080
                        kubectl rollout restart deployment/ecommerce-frontend -n 2401080

                        echo "======= Checking Rollout ======="
                        kubectl rollout status deployment/ecommerce-frontend -n 2401080 --timeout=60s || true
                        kubectl rollout status deployment/ecommerce-backend -n 2401080 --timeout=60s || true

                        echo "======= PODS ======="
                        kubectl get pods -n 2401080
                    '''
                }
            }
        }
    }
}
//test
// pipeline {
//     agent {
//         kubernetes {
//             yaml '''
// apiVersion: v1
// kind: Pod
// spec:
//   containers:

//   - name: node
//     image: mirror.gcr.io/library/node:20
//     command: ["cat"]
//     tty: true

//   - name: sonar-scanner
//     image: sonarsource/sonar-scanner-cli
//     command: ["cat"]
//     tty: true

//   - name: kubectl
//     image: bitnami/kubectl:latest
//     command:
//       - /bin/sh
//       - -c
//       - sleep infinity
//     tty: true
//     securityContext:
//       runAsUser: 0
//       readOnlyRootFilesystem: false
//     env:
//       - name: KUBECONFIG
//         value: /kube/config
//     volumeMounts:
//       - name: kubeconfig-secret
//         mountPath: /kube/config
//         subPath: kubeconfig

//   - name: dind
//     image: docker:dind
//     args:
//       - "--storage-driver=overlay2"
//       - "--insecure-registry=nexus.imcc.com:8085"
//       - "--insecure-registry=nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
//     securityContext:
//       privileged: true
//     env:
//       - name: DOCKER_TLS_CERTDIR
//         value: ""

//   volumes:
//   - name: kubeconfig-secret
//     secret:
//       secretName: kubeconfig-secret
// '''
//         }
//     }

//     environment {
//         NAMESPACE  = "2401080"
//         NEXUS_HOST = "nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
//         NEXUS_REPO = "ecommerce-2401080"
//     }

//     stages {

//         stage("CHECK") {
//             steps {
//                 echo "Pipeline started for namespace ${NAMESPACE}"
//             }
//         }

//         stage('Install + Build Frontend') {
//             steps {
//                 dir('frontend') {
//                     container('node') {
//                         sh '''
//                             npm install
//                             npm run build
//                         '''
//                     }
//                 }
//             }
//         }

//         stage('Install Backend') {
//             steps {
//                 dir('backend') {
//                     container('node') {
//                         sh 'npm install'
//                     }
//                 }
//             }
//         }

//         stage("Build Docker Images") {
//             steps {
//                 container("dind") {
//                     sh """
//                         docker build -t ecommerce-frontend:latest -f frontend/Dockerfile frontend/
//                         docker build -t ecommerce-backend:latest -f backend/Dockerfile backend/
//                     """
//                 }
//             }
//         }

//         stage('SonarQube Analysis') {
//             steps {
//                 container('sonar-scanner') {
//                     sh '''
//                         sonar-scanner \
//                           -Dsonar.projectKey=ecommerce_project \
//                           -Dsonar.sources=backend,frontend \
//                           -Dsonar.host.url=http://my-sonarqube-sonarqube.sonarqube.svc.cluster.local:9000 \
//                           -Dsonar.token=sqp_6c8cff2d8f8ba5ac58c1fcd88215b42648d4c60d
//                     '''
//                 }
//             }
//         }

//         stage("Login to Nexus") {
//             steps {
//                 container("dind") {
//                     sh """
//                         docker login http://${NEXUS_HOST} \
//                           -u student \
//                           -p Imcc@2025
//                     """
//                 }
//             }
//         }

//         stage("Push Images") {
//             steps {
//                 container("dind") {
//                     sh """
//                         docker tag ecommerce-frontend:${BUILD_NUMBER} ${NEXUS_HOST}/${NEXUS_REPO}/ecommerce-frontend:${BUILD_NUMBER}
//                         docker tag ecommerce-backend:${BUILD_NUMBER}  ${NEXUS_HOST}/${NEXUS_REPO}/ecommerce-backend:${BUILD_NUMBER}

//                         docker push ${NEXUS_HOST}/${NEXUS_REPO}/ecommerce-frontend:${BUILD_NUMBER}
//                         docker push ${NEXUS_HOST}/${NEXUS_REPO}/ecommerce-backend:${BUILD_NUMBER}
//                     """
//                 }
//             }
//         }

//         stage('Deploy to Kubernetes') {
//     steps {
//         container('kubectl') {
//             sh '''
//                 echo "======= Applying Deployment ======="
//                 envsubst < k8s/deployment.yaml | kubectl apply -n ${NAMESPACE} -f -

//                 echo "======= Applying Service ======="
//                 kubectl apply -n ${NAMESPACE} -f k8s/service.yaml

//                 echo "======= Restarting Deployments ======="
//                 kubectl rollout restart deployment/ecommerce-backend -n ${NAMESPACE}
//                 kubectl rollout restart deployment/ecommerce-frontend -n ${NAMESPACE}

//                 echo "======= Waiting for Rollout ======="
//                 kubectl rollout status deployment/ecommerce-backend -n ${NAMESPACE} --timeout=180s || true
//                 kubectl rollout status deployment/ecommerce-frontend -n ${NAMESPACE} --timeout=180s || true

//                 echo "======= POD STATUS ======="
//                 kubectl get pods -n ${NAMESPACE}
//             '''
//         }
//     }
// }


// stage('Debug Logs') {
//     steps {
//         container('kubectl') {
//             sh '''
//                 echo "======= BACKEND LOGS ======="
//                 kubectl logs deployment/ecommerce-backend -n ${NAMESPACE} --tail=50 || true

//                 echo "======= FRONTEND LOGS ======="
//                 kubectl logs deployment/ecommerce-frontend -n ${NAMESPACE} --tail=50 || true
//             '''
//         }
//     }
// }

//     }
// }
