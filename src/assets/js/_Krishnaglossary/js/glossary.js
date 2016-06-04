(function($) {
    $.fn.klossary = function(options) {
        var defaults = {
            hilightColor: 'green',
            targetElm: this.selector,
            dataPath: "_req",
            selectBoxClass: false,
            onSelectChange: function() {},
            onResultsChange: function() {}
        }
        var settings = $.extend({}, defaults, options);

        return this.each(function() {
            if (!localStorage.getItem("kloCount")) {
                localStorage.setItem("kloCount", 0)
            } else {
                var x = parseInt(localStorage.getItem("kloCount")) + 1;
                localStorage.setItem("kloCount", x)
            }

            console.log(localStorage.getItem("kloCount"));
            if (!kloCount) {
                kloCount = 0;
            }
            
            var kloCount = localStorage.getItem("kloCount");
            function klos(settings) {}
            var alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            klos.prototype.error = function(msg) {
                var elm;
                if ($("#klossary_error").size() > 0) {
                    elm = $("#klossary_error");
                } else {
                    elm = document.createElement("div");
                    elm.setAttribute("id", "klossary_error");
                    elm.setAttribute("class", "alert alert-danger");
                }
                $(elm).html(msg || "error occured !");
                $(settings.targetElm).append(elm);
            };
            klos.prototype.checkReq = function(argument) {
                var sc = this;
                $.each(settings, function(key, value) {
                    if (value == "_req") {
                        console.error("Error: Missing required attribute " + "'" + key + "'");
                        sc.error("Error: Missing required attribute " + "'" + key + "'");
                        return;
                    }
                });
                // all tests passed, load data;
                this.getData();
            }
            klos.prototype.getData = function() {
                var sc = this;
                $.getJSON(settings.dataPath, function(data) {
                    sc.makeKlossary(data.data);
                })
            };
            klos.prototype.sortArray = function(objArray) {
                objArray.sort(function(a, b) {
                    var textA = a.title.toUpperCase();
                    var textB = b.title.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                return objArray;
            };

            klos.prototype.makeKlossary = function(data) {
                var originalData = data;
                var filledArray = [];
                for (var x = 0; x < alphabets.length; x++) {
                    filledArray[x] = []
                    for (var i = 0; i < originalData.length; i++) {
                        if (alphabets[x] == originalData[i].title[0].toUpperCase()) {
                            filledArray[x].push(originalData[i]);
                        }
                    }
                }
                this.populateElements(filledArray);
            };
            klos.prototype.addEvent = function(elm, indexData) {
                var sc = this;
                var cir = elm;
                if (cir)
                    cir.addEventListener("click", function() {
                        sc.printResults(indexData);
                    })
            };
            klos.prototype.printResults = function(data) {
                var elm;
                if ($('#printResults_' + kloCount).size() > 0) {
                    elm = $('#printResults_' + kloCount)
                } else {
                    elm = document.createElement("div");
                    elm.setAttribute("id", 'printResults_' + kloCount);
                    $(settings.targetElm).append(elm);
                }
                clearCanvas(elm);

                var sel;
                if ($("#klo_sel_" + kloCount).size() > 0) {
                    sel = $("#klo_sel_" + kloCount);
                } else {
                    sel = document.createElement("select");
                    sel.setAttribute("id", "klo_sel_" + kloCount);
                    sel.setAttribute("class", settings.selectBoxClass || "");
                }
                for (var x = 0; x < data.length; x++) {
                    $(sel).append($("<option>").attr('value', x).text(data[x].title));
                }

                $(sel).change(function() {
                    clearCanvas($("#KloResultsWrap_" + kloCount));
                    writeData(this.value);
                    settings.onSelectChange.call();
                })
                $(elm).append(sel);

                function clearCanvas(elm) {
                    $(elm).html("");
                }

                function writeData(x) {
                    var wrapper

                    if ($("#KloResultsWrap_" + kloCount).size() > 0) {
                        wrapper = $("#KloResultsWrap_" + kloCount);
                    } else {
                        wrapper = document.createElement("div");
                        wrapper.setAttribute("class", "KloResultsWrap");
                        wrapper.setAttribute("id", "KloResultsWrap_" + kloCount)
                    }
                    $("#KloResultsWrap_" + kloCount).html("");
                    var h2 = document.createElement("h2");
                    var p = document.createElement("p");
                    $(p).html(data[x].desc);
                    $(h2).html(data[x].title);
                    $(wrapper).append(h2);
                    $(wrapper).append(p);
                    $(elm).append(wrapper);
                    settings.onResultsChange.call();
                }
                writeData(0);
                //execute a callback after writing results;
            };
            klos.prototype.populateElements = function(filledArray) {
                var sc = this;
                for (var x = 0; x < filledArray.length; x++) {
                    var elm = document.createElement("button");
                    elm.innerHTML = alphabets[x];
                    elm.setAttribute("class", "btn btn-primary kloBtns")
                    elm.setAttribute("id", "kloBtns_" + kloCount + "_" + x)
                    if (filledArray[x].length > 0) {
                        elm.removeAttribute("disabled")
                    } else {
                        elm.setAttribute("disabled", "true")
                    }
                    sc.addEvent(elm, filledArray[x]);
                    $(settings.targetElm).append(elm);
                }
                setTimeout(function() {
                    sc.printResults(filledArray[0]);
                }, 1000);

            };
            // Initialization
            var _kl = new klos();
            _kl.checkReq();
        });
    }
})(jQuery)
