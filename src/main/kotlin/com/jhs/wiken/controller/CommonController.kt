package com.jhs.wiken.controller

import com.jhs.wiken.vo.Rq
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.util.function.Consumer


@Controller
class CommonController(
    private val rq: Rq
) {
    @RequestMapping("/rawResource")
    @ResponseBody
    fun showRawResource(uri: String, ): String {
        if (!uri.startsWith("/resource/")) {
            return "";
        }

        val resource = ClassPathResource("static/${uri}")
        val str = StringBuilder()
        val path: Path = Paths.get(resource.uri)
        val content: List<String> = Files.readAllLines(path)
        content.forEach(Consumer { x: String? -> str.append(x + "\n") })

        return str.toString()
    }
}