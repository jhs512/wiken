package com.jhs.wiken

import org.springframework.beans.factory.annotation.Value
import javax.servlet.http.HttpSessionEvent
import javax.servlet.http.HttpSessionListener

class SessionListener : HttpSessionListener {
    @Value("\${server.servlet.session.timeout}")
    private val sessionTime = 0
    override fun sessionCreated(se: HttpSessionEvent) {
        se.session.maxInactiveInterval = sessionTime
    }

    override fun sessionDestroyed(se: HttpSessionEvent) {}
}
