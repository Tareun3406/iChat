import com.moowork.gradle.node.npm.NpmTask

plugins {
    java
    id("org.springframework.boot") version "2.7.6"
    id("io.spring.dependency-management") version "1.0.15.RELEASE"
    id("com.moowork.node") version "1.3.1"
}

group = "kr.tareun"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_1_8

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-mail")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-websocket")
    compileOnly("org.projectlombok:lombok")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    runtimeOnly("com.mysql:mysql-connector-j")
    annotationProcessor("org.projectlombok:lombok")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")
}

tasks.withType<Test> {
    useJUnitPlatform()
}


//task<NpmTask>("appNpmInstall"){
//    setWorkingDir(file("${project.projectDir}/frontend"))
//    setArgs(listOf("install"))
//}
//task<NpmTask>("npmBuild"){
//    setWorkingDir(file("${project.projectDir}/frontend"))
//    setArgs(listOf("run","build"))
//}
//task<Copy>("copyFrontToStatic") {
//    from("/frontend/build")
//    into("build/resources/static")
//}

