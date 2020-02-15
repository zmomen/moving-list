package com.proj;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.SparkSession;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TodoApplicationConfiguration {
    @Bean
    public SparkConf sparkConf() {
        SparkConf sparkConf = new SparkConf()
                .setAppName("todo spark appname")
//                .setSparkHome(sparkHome)
//                .setMaster(masterUri)
//                .set("spark.mongodb.input.uri", "mongodb://localhost/DB.Collection")
//                .set("spark.mongodb.output.uri","mongodb://localhost/DB.Collection")
                ;

        return sparkConf;
    }

    @Bean
    public JavaSparkContext javaSparkContext() {
        return new JavaSparkContext(sparkConf());
    }

    @Bean
    public SparkSession sparkSession() {
        return SparkSession
                .builder()
                .sparkContext(javaSparkContext().sc())
                .appName("Java Spark SQL basic example")
                .getOrCreate();
    }

}