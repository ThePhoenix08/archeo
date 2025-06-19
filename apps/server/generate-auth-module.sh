#!/bin/bash

# Set base module directory
MODULE_NAME="verification"
BASE_PACKAGE="com/archeo/server/modules/$MODULE_NAME"

echo "Creating directory structure for module: $MODULE_NAME"

# Create main folders
mkdir -p $MODULE_NAME/src/main/java/$BASE_PACKAGE
mkdir -p $MODULE_NAME/src/main/resources
mkdir -p $MODULE_NAME/src/test/java/$BASE_PACKAGE

# Sub-package structure
mkdir -p $MODULE_NAME/src/main/java/$BASE_PACKAGE/controllers
mkdir -p $MODULE_NAME/src/main/java/$BASE_PACKAGE/models
mkdir -p $MODULE_NAME/src/main/java/$BASE_PACKAGE/repositories
mkdir -p $MODULE_NAME/src/main/java/$BASE_PACKAGE/services
mkdir -p $MODULE_NAME/src/main/java/$BASE_PACKAGE/config

# Create placeholder files (optional)
touch $MODULE_NAME/src/main/java/$BASE_PACKAGE/controllers/VerificationController.java
touch $MODULE_NAME/src/main/java/$BASE_PACKAGE/models/Verification.java
touch $MODULE_NAME/src/main/java/$BASE_PACKAGE/repositories/VerificationRepository.java
touch $MODULE_NAME/src/main/java/$BASE_PACKAGE/services/VerificationService.java
touch $MODULE_NAME/src/main/java/$BASE_PACKAGE/config/SecurityConfig.java
touch $MODULE_NAME/src/test/java/$BASE_PACKAGE/VerificationTests.java
touch $MODULE_NAME/src/main/resources/application.properties

# Create module POM file
cat <<EOF > $MODULE_NAME/pom.xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">

  <modelVersion>4.0.0</modelVersion>

  <parent>
    <groupId>com.archeo</groupId>
    <artifactId>archeo-parent</artifactId>
    <version>1.0.0</version>
  </parent>

  <artifactId>verification</artifactId>
  <packaging>jar</packaging>
  <name>Verification Module</name>

  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
      <groupId>com.vladmihalcea</groupId>
      <artifactId>hibernate-types-60</artifactId>
    </dependency>
    <dependency>
      <groupId>org.postgresql</groupId>
      <artifactId>postgresql</artifactId>
    </dependency>
    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <scope>provided</scope>
    </dependency>
  </dependencies>

</project>
EOF