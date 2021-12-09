package com.jhs.wiken.vo

data class Ken(
    val id: Int,
    val regDate: String,
    val updateDate: String,
    val memberId: Int,
    val title: String,
    val source: String,
    val result: String,
) {
    val sourceForPrint: String
        get() {
            return source.replace("<script", "<t-script").replace("</script", "</t-script")
        }

    val titleWithKeywords: String
        get() {
            return title + " " + kenConfig.keywords.joinToString(" #", "#", "", 3)
        }

    val strKeywords: String
        get() {
            return kenConfig.keywords.joinToString(" #", "#")
        }

    val kenConfig: KenConfig
        get() {
            return sourceInterpreter.kenConfig
        }

    val sourceInterpreter: KenSourceInterpreter
        get() {
            return KenSourceInterpreter.from(source)
        }
}
