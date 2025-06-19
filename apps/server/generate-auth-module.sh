#!/bin/bash

# Set base module directory
MODULE_NAME="common"
BASE_PACKAGE="com/archeo/common"

echo "Creating directory structure for shared module: $MODULE_NAME"

# Create main folders
mkdir -p $MODULE_NAME/src/main/java/$BASE_PACKAGE
mkdir -p $MODULE_NAME/src/main/resources
mkdir -p $MODULE_NAME/src/test/java/$BASE_PACKAGE

# Sub-package structure
mkdir -p $MODULE_NAME/src/main/java/$BASE_PACKAGE/config
mkdir -p $MODULE_NAME/src/main/java/$BASE_PACKAGE/enums
mkdir -p $MODULE_NAME/src/main/java/$BASE_PACKAGE/constants
mkdir -p $MODULE_NAME/src/main/java/$BASE_PACKAGE/exceptions
mkdir -p $MODULE_NAME/src/main/java/$BASE_PACKAGE/utils
mkdir -p $MODULE_NAME/src/main/java/$BASE_PACKAGE/dto

# Create placeholder files (optional)
touch $MODULE_NAME/src/main/java/$BASE_PACKAGE/enums/USER_ROLE.java
touch $MODULE_NAME/src/main/java/$BASE_PACKAGE/config/WebConfig.java
touch $MODULE_NAME/src/main/java/$BASE_PACKAGE/constants/AppConstants.java
touch $MODULE_NAME/src/main/java/$BASE_PACKAGE/exceptions/GlobalExceptionHandler.java
touch $MODULE_NAME/src/main/java/$BASE_PACKAGE/utils/CommonUtils.java
touch $MODULE_NAME/src/main/java/$BASE_PACKAGE/dto/ApiResponse.java
touch $MODULE_NAME/src/test/java/$BASE_PACKAGE/CommonTests.java
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

  <artifactId>common</artifactId>
  <packaging>jar</packaging>
  <name>Common Shared Module</name>

  <dependencies>
    <!-- Lombok for boilerplate removal -->
    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <scope>provided</scope>
    </dependency>

    <!-- Add other utilities as needed -->
  </dependencies>

</project>
EOF