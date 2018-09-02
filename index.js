var select = document.getElementsByClassName("image-picker")[0];
for (var i in images) {
    var image = images[i];
    var option = document.createElement("option");
    option.text = image.substr(0, image.lastIndexOf('.'));
    option.setAttribute("text", i.toString());
    option.setAttribute("id", image);
    option.setAttribute("data-img-src", src_min + image);
    select.add(option);
}

function copyToClipboard(elem) {
    var disabled = elem.disabled;
    elem.disabled = false;
    // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }

    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    elem.disabled = disabled;
    var alert = document.getElementById("alert");
    alert.hidden = false;
    var newone = alert.cloneNode(true);
    alert.parentNode.replaceChild(newone, alert);
    return succeed;
}

var url = "(image)";

function updateView() {
    var input = document.getElementById("command");
    var output = document.getElementById("output");
    output.value = input.value.replace("%image%", encodeURI(src_local + url));
    copyToClipboard(output);
    document.getElementById("view").setAttribute("src", src_max + url);
}

$("select").imagepicker({
    show_label: true,
    selected: function(select, option, event) {
        url = select.option[0].getAttribute("id");
        updateView();
    }
});

/*
String src = <...>;
int width = 100;
int height = 100;
for (File file : new File(src).listFiles()) {
    if (!file.isFile()) continue;
    BufferedImage img = MainUtil.readImage(file);
    BufferedImage scaled = ImageUtil.getScaledInstance(img, width, height, RenderingHints.VALUE_INTERPOLATION_BILINEAR, true);
    File out = new File(src + File.separator + "min" + File.separator + file.getName());
    if (out.exists()) out.delete();
    else out.getParentFile().mkdirs();
    System.out.println("Writing " + out);
    ImageIO.write(scaled, "png", out);
}
 */