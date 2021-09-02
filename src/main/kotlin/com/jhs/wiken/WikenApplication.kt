package com.jhs.wiken

import nz.net.ultraq.thymeleaf.LayoutDialect
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cache.annotation.EnableCaching
import org.springframework.context.annotation.Bean


@EnableCaching
@SpringBootApplication
class WikenApplication

@Bean
fun layoutDialect(): LayoutDialect? {
    return LayoutDialect()
}

fun main(args: Array<String>) {
    runApplication<WikenApplication>(*args)
}
