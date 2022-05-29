if ( pdfMode === undefined ) {
  var pdfMode = false;
}

function getUriParams(uri) {
  uri = uri.trim();
  uri = uri.replaceAll("&amp;", "&");
  if (uri.indexOf("#") !== -1) {
    let pos = uri.indexOf("#");
    uri = uri.substr(0, pos);
  }

  let params = {};

  uri.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
    params[key] = value;
  });
  return params;
}

function renderPptButton(source) {
  const id = 'ppt-btn-' + Math.ceil(Math.random() * 10000);

  source = source.replace(/\$\$end/gi, "$$$");

  const indexOfFirstH1 = source.indexOf('#');
  const title = source.substr(0, indexOfFirstH1).trim().replace('title:', '').trim();

  const aId = 'open-' + strToHtmlHash(title);

  setTimeout(() => {
    $('#' + id).parent().data('source', source);
    $('#' + id).parent().click(function() {
      const source = $(this).data('source');
      showPpt(source);
    });
  }, 100);

  return [
    `<a id="${aId}" style="cursor:pointer; scroll-margin-top:10px; margin-bottom:10px; display:inline-block;"><span id="${id}">${title}</span></a>`,
    title,
    aId
  ];
}

let pptVisible = false;
let pptIndex;
let pptSlides;

function showPpt(source) {
  pptVisible = true;
  $('html').addClass('ppt-popup-visible');
  const $node = $('.ppt-popup .toast-ui-viewer');
  const viewer = $node.data('data-toast-editor');

  pptIndex = 0;

  viewer.setMarkdown(source);
  ToastEditorView__afterSetMarkdown($node);

  pptSlides = $node.find('h1').length;

  setTimeout(function() {
    ToastEditorView__afterSetMarkdownForPpt($node);
    $node.find(' > div').scrollTop(0);
  }, 0);

  $('.ppt-popup').removeClass('hidden');

  showPptCloseBtnTemp();
}

function showPptCloseBtnTemp() {
  $('.ppt-popup .btn-popup, .ppt-popup .page').removeClass('hide');

  setTimeout(function() {
    $('.ppt-popup .btn-popup, .ppt-popup .page').addClass('hide');
  }, 100);
}

function hidePpt() {
  pptVisible = false;
  $('html').removeClass('ppt-popup-visible');
  const $node = $('.ppt-popup .toast-ui-viewer');
  const viewer = $node.data('data-toast-editor');
  viewer.setMarkdown('');
  const $contents = $node.find('.toastui-editor-contents');
  $contents.empty();
  $('.ppt-popup').addClass('hidden');
  removeRect();
}

$(document).keydown(function(event) {
  if ( event.keyCode == 27 || event.which == 27 ) {
    hidePpt();
  }

  if ( pptVisible ) {
    if ( event.keyCode == 33 || event.which == 33 ) {
      pptIndex = pptIndex == 0 ? 0 : pptIndex - 1;
      event.preventDefault();
      const $node = $('.ppt-popup .toast-ui-viewer');
      //$node.find(' > div').scrollTop($node.find(' > div > div').eq(pptIndex).position().top);
      $node.find(' > div > div').eq(pptIndex).get(0).scrollIntoView();
    }
    else if ( event.keyCode == 34 || event.which == 34 ) {
      pptIndex = pptIndex + 1 == pptSlides ? pptIndex : pptIndex + 1;
      event.preventDefault();
      const $node = $('.ppt-popup .toast-ui-viewer');
      //$node.find(' > div').scrollTop($node.find(' > div > div').eq(pptIndex).position().top);
      $node.find(' > div > div').eq(pptIndex).get(0).scrollIntoView();
    }
  }
});

$(function() {
  $('.ppt-popup .btn-popup').click(hidePpt);

  $('.ppt-popup').mousemove(function() {
    showPptCloseBtnTemp();
  });

  $('.ppt-popup').click(function() {
      showPptCloseBtnTemp();
    });
})

function pptPlugin() {
  const toHTMLRenderers = {
    ppt(node) {
      let [html, title, aId] = renderPptButton(node.literal);

      if ( pdfMode ) {
        html = `<a href="http://wiken.io/ken/${kenId}#${aId}" target="_blank">http://wiken.io/ken/${kenId}#${aId}</a>`
      }

      return [
        { type: "openTag", tagName: "div", outerNewLine: true },
        { type: "html", content: html },
        { type: "closeTag", tagName: "div", outerNewLine: true },
      ];
    },
  };

  return { toHTMLRenderers };
}

function codepenPlugin() {
  const toHTMLRenderers = {
    codepen(node) {
      const html = renderCodepen(node.literal);

      return [
        { type: "openTag", tagName: "div", outerNewLine: true },
        { type: "html", content: html },
        { type: "closeTag", tagName: "div", outerNewLine: true },
      ];
    },
  };

  function renderCodepen(uri) {
    let uriParams = getUriParams(uri);

    let height = 400;

    let preview = "";

    if (uriParams.height) {
      height = uriParams.height;
    }

    let width = "100%";

    if (uriParams.width) {
      width = uriParams.width;
    }

    if (!isNaN(width)) {
      width += "px";
    }

    let iframeUri = uri;

    if (iframeUri.indexOf("#") !== -1) {
      let pos = iframeUri.indexOf("#");
      iframeUri = iframeUri.substr(0, pos);
    }

    if ( pdfMode ) {
      const url = iframeUri.split('?')[0].replace('embed', 'pen');
      return `<a href="${url}" target="_blank">${url}</a>`;
    }

    return (
      '<iframe height="' +
      height +
      '" style="width: ' +
      width +
      ';" scrolling="no" title="" src="' +
      iframeUri +
      '" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>'
    );
  }

  return { toHTMLRenderers };
}
// 유튜브 플러그인 끝

// repl 플러그인 시작
function replPlugin() {
  const toHTMLRenderers = {
    repl(node) {
      const html = renderRepl(node.literal);

      return [
        { type: "openTag", tagName: "div", outerNewLine: true },
        { type: "html", content: html },
        { type: "closeTag", tagName: "div", outerNewLine: true },
      ];
    },
  };

  function renderRepl(uri) {
    var uriParams = getUriParams(uri);

    var height = 400;

    if (uriParams.height) {
      height = uriParams.height;
    }

    if ( pdfMode ) {
      return `<a href="${uri}" target="_blank">${uri}</a>`;
    }

    return (
      '<iframe frameborder="0" width="100%" height="' +
      height +
      'px" src="' +
      uri +
      '"></iframe>'
    );
  }

  return { toHTMLRenderers };
}

function youtubePlugin() {
  const toHTMLRenderers = {
    youtube(node) {
      const html = renderYoutube(node.literal);

      return [
        { type: "openTag", tagName: "div", outerNewLine: true },
        { type: "html", content: html },
        { type: "closeTag", tagName: "div", outerNewLine: true },
      ];
    },
  };

  function renderYoutube(uri) {
    uri = uri.replace("https://www.youtube.com/watch?v=", "");
    uri = uri.replace("http://www.youtube.com/watch?v=", "");
    uri = uri.replace("www.youtube.com/watch?v=", "");
    uri = uri.replace("youtube.com/watch?v=", "");
    uri = uri.replace("https://youtu.be/", "");
    uri = uri.replace("http://youtu.be/", "");
    uri = uri.replace("youtu.be/", "");

    let uriParams = getUriParams(uri);

    let width = "100%";
    let height = "100%";

    let maxWidth = 500;

    if (!uriParams["max-width"] && uriParams["ratio"] == "9/16") {
      uriParams["max-width"] = 300;
    }

    if (uriParams["max-width"]) {
      maxWidth = uriParams["max-width"];
    }

    let ratio = "16/9";

    if (uriParams["ratio"]) {
      ratio = uriParams["ratio"];
    }

    let marginLeft = "auto";

    if (uriParams["margin-left"]) {
      marginLeft = uriParams["margin-left"];
    }

    let marginRight = "auto";

    if (uriParams["margin-right"]) {
      marginRight = uriParams["margin-right"];
    }

    let youtubeId = uri;

    if (youtubeId.indexOf("?") !== -1) {
      let pos = uri.indexOf("?");
      youtubeId = youtubeId.substr(0, pos);
    }

    if ( pdfMode ) {
      const url = 'https://youtu.be/' + youtubeId;
      return `<a href="${url}" target="_blank">${url}</a>`;
    }

    return (
      '<div style="max-width:' +
      maxWidth +
      "px; margin-left:" +
      marginLeft +
      "; margin-right:" +
      marginRight +
      ';" class="ratio-' +
      ratio +
      ' relative"><iframe class="absolute top-0 left-0 w-full" width="' +
      width +
      '" height="' +
      height +
      '" src="https://www.youtube.com/embed/' +
      youtubeId +
      '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
    );
  }
  // 유튜브 플러그인 끝

  return { toHTMLRenderers };
}

// katex 플러그인
function katexPlugin() {
  const toHTMLRenderers = {
    katex(node) {
      let html = katex.renderToString(node.literal, {
        throwOnError: false,
      });

      return [
        { type: "openTag", tagName: "div", outerNewLine: true },
        { type: "html", content: html },
        { type: "closeTag", tagName: "div", outerNewLine: true },
      ];
    },
  };

  return { toHTMLRenderers };
}

const ToastEditor__chartOptions = {
  minWidth: 100,
  maxWidth: 600,
  minHeight: 100,
  maxHeight: 300,
};

// config 플러그인
function configPlugin() {
  const toHTMLRenderers = {
    config(node) {
      return [
        { type: "openTag", tagName: "div", outerNewLine: true },
        { type: "html", content: "" },
        { type: "closeTag", tagName: "div", outerNewLine: true },
      ];
    },
  };

  return { toHTMLRenderers };
}

function hidePlugin() {
  const toHTMLRenderers = {
    hide(node) {
      return [
        { type: "openTag", tagName: "div", outerNewLine: true },
        { type: "html", content: "" },
        { type: "closeTag", tagName: "div", outerNewLine: true },
      ];
    },
  };

  return { toHTMLRenderers };
}

function ToastEditor__escape(origin) {
  return origin
    .replaceAll("<t-script", "<script")
    .replaceAll("</t-script", "</script");
}

function ToastEditor__init() {
  $(".toast-ui-editor").each(function (index, node) {
    const $node = $(node);
    const $initialValueEl = $node.find(" > script");
    const initialValue =
      $initialValueEl.length == 0
        ? ""
        : ToastEditor__escape($initialValueEl.html().trim());

    const editor = new toastui.Editor({
      el: node,
      previewStyle: "vertical",
      initialValue: initialValue,
      height: "100%",
      placeholder: "Please enter text.",
      theme: toastUiThemeName,
      plugins: [
        [toastui.Editor.plugin.chart, ToastEditor__chartOptions],
        [toastui.Editor.plugin.codeSyntaxHighlight, { highlighter: Prism }],
        toastui.Editor.plugin.colorSyntax,
        toastui.Editor.plugin.tableMergedCell,
        [toastui.Editor.plugin.uml, { rendererURL: 'http://www.plantuml.com/plantuml/svg/' }],
        katexPlugin,
        youtubePlugin,
        codepenPlugin,
        pptPlugin,
        replPlugin,
        configPlugin,
        hidePlugin,
      ],
      customHTMLSanitizer: (html) => {
        return (
          DOMPurify.sanitize(html, {
            ADD_TAGS: ["iframe"],
            ADD_ATTR: [
              "width",
              "height",
              "allow",
              "allowfullscreen",
              "frameborder",
              "scrolling",
              "style",
              "title",
              "loading",
              "allowtransparency",
            ],
          }) || ""
        );
      },
    });

    $node.data("data-toast-editor", editor);
  });
}

function ToastEditorView__init() {
  $(".toast-ui-viewer").each(function (index, node) {
    const $node = $(node);
    const $initialValueEl = $node.find(" > script");
    const initialValue =
      $initialValueEl.length == 0
        ? ""
        : ToastEditor__escape($initialValueEl.html().trim());
    $node.empty();

    const viewer = new toastui.Editor.factory({
      el: node,
      initialValue: initialValue,
      viewer: true,
      theme: toastUiThemeName,
      plugins: [
        [toastui.Editor.plugin.chart, ToastEditor__chartOptions],
        [toastui.Editor.plugin.codeSyntaxHighlight, { highlighter: Prism }],
        toastui.Editor.plugin.colorSyntax,
        toastui.Editor.plugin.tableMergedCell,
        [toastui.Editor.plugin.uml, { rendererURL: 'http://www.plantuml.com/plantuml/svg/' }],
        katexPlugin,
        youtubePlugin,
        codepenPlugin,
        pptPlugin,
        replPlugin,
        configPlugin,
        hidePlugin,
      ],
      customHTMLSanitizer: (html) => {
        return (
          DOMPurify.sanitize(html, {
            ADD_TAGS: ["iframe"],
            ADD_ATTR: [
              "width",
              "height",
              "allow",
              "allowfullscreen",
              "frameborder",
              "scrolling",
              "style",
              "title",
              "loading",
              "allowtransparency",
            ],
          }) || ""
        );
      },
    });

    $node.data("data-toast-editor", viewer);

    ToastEditorView__afterSetMarkdown($node);
  });
}

function ToastEditorView__afterSetMarkdownForPpt($node) {
  const text = $node.text();
  const $pages = [];
  const optionsMaps = [];

  $node.find('img[src^="http://www.plantuml.com/plantuml/svg/"]').each(function(index, node) {
    const $node = $(node);

    let zoomDone = false;

    /*
    setTimeout(function() {
      if ( zoomDone == false && $node.width() ) {
        $node.width($node.width() * 1.9);
        zoomDone = true;
      }
    }, 1000);

    setTimeout(function() {
      if ( zoomDone == false && $node.width() ) {
        $node.width($node.width() * 1.9);
        zoomDone = true;
      }
    }, 2000);

    setTimeout(function() {
      if ( zoomDone == false && $node.width() ) {
        $node.width($node.width() * 1.9);
        zoomDone = true;
      }
    }, 5000);
    */
  });

  $node.find('h1').each(function(index, node) {
    const $h1 = $(node);

    const $page = [];

    let $next = $h1;

    while ( true ) {
      if ( $next.prop('tagName') == 'H1' ) {
        const text = $next
          .text()
          .replace(/\[br \/\]/gi, '<br class="hidden sm:block" />')
          .replace(
            /\[span style="(.+?)"](.+?)\[\/span\]/g,
            function (match, contents1, contents2) {
              return `<span style="${contents1}">${contents2}</span>`;
            }
          );
        const h1Texts = text.split('--o--');
        const optionsMap = {};
        optionsMap['CLASS'] = '';

        if ( h1Texts.length == 2 ) {
          $next.html(h1Texts[0]);
          const options = h1Texts[1].split(',');

          options.forEach((optionStr) => {
            const optionStrBits = optionStr.split('=');
            const key = optionStrBits[0];
            const value = optionStrBits.length == 2 ? optionStrBits[1] : 'DEFAULT';

            optionsMap[key] = value;
          });

          if ( optionsMap.t && optionsMap.t == '1' ) {
            optionsMap['CLASS'] = 'h1-border-none text-center';
          }
        }
        else {
          $next.html(text);
        }

        if ( optionsMap['CLASS'].indexOf('box-mx-') == -1 ) {
          optionsMap['CLASS'] += ' box-mx-20';
        }

        optionsMaps.push(optionsMap);
      }

      $page.push($next);

      $next = $next.next();

      if ( $next.prop('tagName') == 'H1' || $next.length == 0 ) {
        break;
      }
    }

    $pages.push($page);
  });

  const $contents = $node.find('.toastui-editor-contents');
  $contents.empty();

  const pagesTotal = $pages.length;

  $pages.forEach(($page, index) => {
    const $div = $('<div />');

    $page.forEach(($pageItem) => {
      $div.append($pageItem);
    });

    const currentPage = index + 1;

    $div.append(`<div class="page">${currentPage} / ${pagesTotal}</div>`);

    const $wrap = $('<div />');
    $wrap.append($div);

    $wrap.addClass(optionsMaps[index].CLASS);

    $contents.append($wrap);
  })
}

function ToastEditorView__afterSetMarkdown($node) {
  $node.find("a").attr("target", "_blank");

  $node.find("h1,h2,h3").each(function (index, node) {
    const $node = $(node);

    const hash = strToHtmlHash($node.text());

    $node.attr("id", hash);
    $node.css("scroll-margin-top", "10px");
  });

  $node.find('img[src^="http://www.plantuml.com/plantuml/svg/"]').each(function(index, node) {
    const $node = $(node);
    if ( $node.width() ) {
      $node.width($node.width() * 1.5);
      setTimeout(function() {
        if ( pdfMode ) {
          $node.height($node.height());
        }
      }, 100);
    }
    else {
      $node.on('load', function() {
        $node.width($node.width() * 1.5);
        setTimeout(function() {
          if ( pdfMode ) {
            $node.height($node.height());
          }
        }, 100);
      });
    }
  });
}

let tryToGoHashEl__callCount = 0;

function tryToGoHashEl() {
  tryToGoHashEl__callCount++;

  if (tryToGoHashEl__callCount == 10) {
    return;
  }

  if (urlHash && urlHashEl == null) {
    urlHashEl = document.getElementById(urlHash);
    setTimeout(() => {
      urlHashEl.scrollIntoView();
      $(urlHashEl).css('color', 'red');

      if ( urlHash.startsWith("open-") ) {
        $(urlHashEl).click();
      }
    }, 500);
  }
}

function DrawRect__init() {
  const $window = $(window);
  let rectangleLeft = 0;
  let rectangleTop = 0;
  let currentMouseCursorX = 0;
  let currentMouseCursorY = 0;
  let rectangleVisible = false;
  let drawRectStarted = false;

  $window.on('mousemove', function (event) {
    currentMouseCursorX = event.clientX;
    currentMouseCursorY = event.clientY;
  });

  $window.on("keydown", function (event) {
    if ( event.keyCode == 18 && pptVisible ) {
      if ( rectangleVisible ) {
        removeRect();
      }
      else {
        //startDrawRect();
      }
    }
  });

  $window.on("keyup", function (event) {
    if ( event.keyCode == 18 && pptVisible ) {
      completeDrawRect();
    }

    if ( event.keyCode == 27 && pptVisible && rectangleVisible ) {
      removeRect();
      event.preventDefault();
      return;
    }
  });

  function startDrawRect() {
    if ( drawRectStarted ) return;

    drawRectStarted = true;

    rectangleLeft = currentMouseCursorX;
    rectangleTop = currentMouseCursorY;
  }

  function completeDrawRect() {
    const width = currentMouseCursorX - rectangleLeft;
    const height = currentMouseCursorY - rectangleTop;

    $('.rectangle')
      .css('top', rectangleTop - 3)
      .css('left', rectangleLeft - 3)
      .css('width', width + 6)
      .css('height', height + 6)
      .show();

    drawRectStarted = false;
    rectangleVisible = true;
  }
}

function removeRect() {
  drawRectStarted = false;
  rectangleVisible = false;
  $('.rectangle').hide();
}

$(function () {
  ToastEditor__init();
  ToastEditorView__init();
  tryToGoHashEl();
  DrawRect__init();
});
