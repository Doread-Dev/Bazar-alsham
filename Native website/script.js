(function(e, t) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = t();
    } else if (typeof define === "function" && define.amd) {
        define([], t);
    } else if (typeof exports === "object") {
        exports.SelectStyle = t();
    } else {
        e.SelectStyle = t();
    }
    })
    (self, (() => (() => {
    var e = {
        d: (t, i) => {
            for (var s in i) {
                if (e.o(i, s) && !e.o(t, s)) {
                    Object.defineProperty(t, s, {
                        enumerable: true,
                        get: i[s]
                    });
                }
            }
        },
        o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
        r: e => {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                });
            }
            Object.defineProperty(e, "__esModule", {
                value: true
            });
        }
    };
    var t = {};
    function i(e) {
        var t = document.createEvent("MouseEvents");
        t.initEvent("click", true, false);
        e.dispatchEvent(t);
    }
    function s(e) {
        var t = document.createEvent("HTMLEvents");
        t.initEvent("change", true, false);
        e.dispatchEvent(t);
    }
    function o(e) {
        var t = document.createEvent("FocusEvent");
        t.initEvent("focusin", true, false);
        e.dispatchEvent(t);
    }
    function n(e) {
        var t = document.createEvent("FocusEvent");
        t.initEvent("focusout", true, false);
        e.dispatchEvent(t);
    }
    function d(e) {
        var t = document.createEvent("UIEvent");
        t.initEvent("modalclose", true, false);
        e.dispatchEvent(t);
    }
    function l(e, t) {
        if (t === "invalid") {
            c(e.dropdown, "invalid");
            h(e.dropdown, "valid");
        } else {
            c(e.dropdown, "valid");
            h(e.dropdown, "invalid");
        }
    }
    function r(e, t) {
    return e[t] != null ? e[t] : e.getAttribute(t);
    }
    function a(e, t) {
        return e && e.classList.contains(t);
    }
    function c(e, t) {
        if (e) return e.classList.add(t);
    }
    function h(e, t) {
        if (e) return e.classList.remove(t);
    }
    e.r(t);
    e.d(t, {
        bind: () => f,
        default: () => u
    });
    var p = {
        data: null,
        searchable: false,
        showSelectedItems: false
    };
    function u(e, t) {
        this.el = e;
        this.config = Object.assign({}, p, t || {});
        this.data = this.config.data;
        this.selectedOptions = [];
        this.placeholder = r(this.el, "placeholder") || this.config.placeholder || "Select an option";
        this.searchtext = r(this.el, "searchtext") || this.config.searchtext || "Search";
        this.selectedtext = r(this.el, "selectedtext") || this.config.selectedtext || "selected";
        this.dropdown = null;
        this.multiple = r(this.el, "multiple");
        this.disabled = r(this.el, "disabled");
        this.create();
    }
    function f(e, t) {
        return new u(e, t);
    }
    return u.prototype.create = function() {
        this.el.style.opacity = "0";
        this.el.style.width = "0";
        this.el.style.padding = "0";
        this.el.style.height = "0";
        if (this.data) {
        this.processData(this.data);
        } else {
            this.extractData();
        }
        this.renderDropdown();
        this.bindEvent();
    }, 
    u.prototype.processData = function(dataArray) {
        const processedOptions = [];
        dataArray.forEach(item => {
            processedOptions.push({
                data: item,
                attributes: {
                    selected: Boolean(item.selected),
                    disabled: Boolean(item.disabled),
                    optgroup: item.value === "optgroup"
                }
            });
        });
        this.options = processedOptions;
    },
    u.prototype.extractData = function() {
        const elements = this.el.querySelectorAll("option, optgroup");
        const dataList = [];
        const optionsList = [];
        const selectedItems = [];
        elements.forEach(element => {
            let dataItem;
            if (element.tagName === "OPTGROUP") {
                dataItem = {
                    text: element.label,
                    value: "optgroup"
                };
            } else {
                let text = element.innerText;
                if (element.dataset.display != null) {
                    text = element.dataset.display;
                }
                dataItem = {
                    text: text,
                    value: element.value,
                    selected: element.hasAttribute("selected"),
                    disabled: element.hasAttribute("disabled")
                };
            }
            const attributes = {
                selected: element.hasAttribute("selected"),
                disabled: element.hasAttribute("disabled"),
                optgroup: element.tagName === "OPTGROUP"
            };
            dataList.push(dataItem);
            optionsList.push({
                data: dataItem,
                attributes: attributes
            });
        });
        this.data = dataList;
        this.options = optionsList;
        this.options.forEach(option => {
            if (option.attributes.selected) {
                selectedItems.push(option);
            }
        });
        this.selectedOptions = selectedItems;
    },
    u.prototype.renderDropdown = function() {
        const classes = [
            "style-select",
            r(this.el, "class") || "",
            this.disabled ? "disabled" : "",
            this.multiple ? "has-multiple" : ""
        ];
        const searchBoxHTML = `
            <div class="style-select-search-box">
                <input type="text" class="style-select-search" placeholder="${this.searchtext}..." title="search"/>
            </div>`;
        const dropdownHTML = `
            <div class="${classes.join(" ")}" tabindex="${this.disabled ? null : 0}">
                <span class="${this.multiple ? "multiple-options" : "current"}"></span>
                <div class="style-select-dropdown">
                    ${this.config.searchable ? searchBoxHTML : ""}
                    <ul class="list"></ul>
                </div>
            </div>`;
        this.el.insertAdjacentHTML("afterend", dropdownHTML);
        this.dropdown = this.el.nextElementSibling;
        this.renderSelectedItems();
        this.renderItems();
    },
    u.prototype.renderSelectedItems = function () {
        const currentEl = this.dropdown.querySelector(".current");
        let newCurrentEl = this.dropdown.querySelector(".newcurrent");
        if (!newCurrentEl) {
            newCurrentEl = document.createElement("span");
            newCurrentEl.className = "newcurrent";
            currentEl.parentNode.insertBefore(newCurrentEl, currentEl.nextSibling);
        }
        if (this.multiple) {
            let output = "";
            this.selectedOptions.forEach(option => {
                output += `<span class="current">${option.data.text}</span>`;
            });
            output = output === "" ? this.placeholder : output;
            this.dropdown.querySelector(".multiple-options").innerHTML = output;
        } else {
            const selected = this.selectedOptions.length > 0 ? this.selectedOptions[0].data.text : null;
            if (selected) {
                currentEl.style.display = "none";
                newCurrentEl.style.display = "inline";
                newCurrentEl.innerHTML = selected;
                this.dropdown.classList.add("yes");
            } else {
                currentEl.style.display = "inline";
                currentEl.innerHTML = this.placeholder;
                newCurrentEl.style.display = "none";
                newCurrentEl.innerHTML = "";
                this.dropdown.classList.remove("yes");
            }
        }
    }, 
    u.prototype.renderItems = function() {
    const listContainer = this.dropdown.querySelector("ul");
    this.options.forEach(option => {
        const itemElement = this.renderItem(option);
        listContainer.appendChild(itemElement);
    });
    }, 
    u.prototype.renderItem = function(option) {
        const li = document.createElement("li");
        li.innerHTML = option.data.text;
        if (option.attributes.optgroup) {
            c(li, "optgroup");
        } else {
            li.setAttribute("data-value", option.data.value);
            const classes = [
                "option",
                option.attributes.selected ? "selected" : null,
                option.attributes.disabled ? "disabled" : null
            ].filter(Boolean);
            li.addEventListener("click", this.onItemClicked.bind(this, option));
            li.classList.add(...classes);
        }
        option.element = li;
        return li;
    },
    u.prototype.update = function() {
        this.extractData();
        if (this.dropdown) {
            const isOpen = a(this.dropdown, "open");
            this.dropdown.parentNode.removeChild(this.dropdown);
            this.create();
            if (isOpen) {
                i(this.dropdown);
            }
        }
        if (r(this.el, "disabled")) {
            this.disable();
        } else {
            this.enable();
        }
    }, 
    u.prototype.disable = function() {
        if (!this.disabled) {
            this.disabled = true;
            c(this.dropdown, "disabled");
        }
    },
    u.prototype.enable = function() {
        if (this.disabled) {
            this.disabled = false;
            h(this.dropdown, "disabled");
        }
    },
    u.prototype.clear = function() {
        this.resetSelectValue();
        this.selectedOptions = [];
        this.renderSelectedItems();
        this.update();
        s(this.el);
    },
    u.prototype.destroy = function() {
        if (this.dropdown) {
            this.dropdown.parentNode.removeChild(this.dropdown);
            this.el.style.display = "";
        }
    },
    u.prototype.bindEvent = function() {
        this.dropdown.addEventListener("click", this.onClicked.bind(this));
        this.dropdown.addEventListener("keydown", this.onKeyPressed.bind(this));
        this.dropdown.addEventListener("focusin", o.bind(this, this.el));
        this.dropdown.addEventListener("focusout", n.bind(this, this.el));
        this.el.addEventListener("invalid", l.bind(this, this.el, "invalid"));
        window.addEventListener("click", this.onClickedOutside.bind(this));
        if (this.config.searchable) {
            this.bindSearchEvent();
        }
    }, 
    u.prototype.bindSearchEvent = function() {
        const searchInput = this.dropdown.querySelector(".style-select-search");
        if (!searchInput) return;
        searchInput.addEventListener("click", function(event) {
            event.stopPropagation();
            return false;
        });
        searchInput.addEventListener("input", this.onSearchChanged.bind(this));
    }, 
    u.prototype.onClicked = function(event) {
        event.preventDefault();
        const isOpen = a(this.dropdown, "open");
        if (isOpen) {
            if (!this.multiple) {
                h(this.dropdown, "open");
                d(this.el);
            }
        } else {
            c(this.dropdown, "open");
            const modalOpenEvent = document.createEvent("UIEvent");
            modalOpenEvent.initEvent("modalopen", true, false);
            this.el.dispatchEvent(modalOpenEvent);
        }
        if (a(this.dropdown, "open")) {
            const searchInput = this.dropdown.querySelector(".style-select-search");
            if (searchInput) {
                searchInput.value = "";
            }
            const prevFocused = this.dropdown.querySelector(".focus");
            if (prevFocused) h(prevFocused, "focus");
            const selectedItem = this.dropdown.querySelector(".selected");
            if (selectedItem) c(selectedItem, "focus");
            this.dropdown.querySelectorAll("ul li").forEach(li => {
                li.style.display = "";
            });
        } else {
            this.dropdown.focus();
        }
    }, 
    u.prototype.onItemClicked = function(optionData, event) {
        const target = event.target;
        if (a(target, "disabled")) return;
        if (this.multiple) {
            if (a(target, "selected")) {
                h(target, "selected");
                const index = this.selectedOptions.indexOf(optionData);
                if (index !== -1) {
                    this.selectedOptions.splice(index, 1);
                }
                const originalOption = this.el.querySelector(`option[value="${target.dataset.value}"]`);
                if (originalOption) {
                    originalOption.removeAttribute("selected");
                }
            } else {
                c(target, "selected");
                this.selectedOptions.push(optionData);
            }
        } else {
            this.selectedOptions.forEach(opt => h(opt.element, "selected"));
            c(target, "selected");
            this.selectedOptions = [optionData];
        }
        this.renderSelectedItems();
        this.updateSelectValue();
        }, 
    u.prototype.updateSelectValue = function() {
        if (this.multiple) {
            const selectElement = this.el;
            this.selectedOptions.forEach(option => {
                const targetOption = selectElement.querySelector(`option[value="${option.data.value}"]`);
                if (targetOption) {
                    targetOption.setAttribute("selected", true);
                }
            });
        } else {
            if (this.selectedOptions.length > 0) {
                this.el.value = this.selectedOptions[0].data.value;
            }
        }
        s(this.el);
    }, 
    u.prototype.resetSelectValue = function() {
        if (this.multiple) {
            const selectElement = this.el;
            this.selectedOptions.forEach(option => {
                const targetOption = selectElement.querySelector(`option[value="${option.data.value}"]`);
                if (targetOption) {
                    targetOption.removeAttribute("selected");
                }
            });
        } else {
            if (this.selectedOptions.length > 0) {
                this.el.selectedIndex = -1;
            }
        }
        s(this.el);
    }, 
    u.prototype.onClickedOutside = function(event) {
        var clickedOutside = !this.dropdown.contains(event.target);
        if (clickedOutside) {
            h(this.dropdown, "open");
            d(this.el);
        }
    }, 
    u.prototype.onKeyPressed = function(event) {
        var focusedItem = this.dropdown.querySelector(".focus");
        var isOpen = a(this.dropdown, "open");
        switch (event.keyCode) {
            case 13:
                i(isOpen ? focusedItem : this.dropdown);
                break;
            case 40:
                if (isOpen) {
                    var next = this.findNext(focusedItem);
                    if (next) {
                        h(this.dropdown.querySelector(".focus"), "focus");
                        c(next, "focus");
                    }
                } else {
                    i(this.dropdown);
                }
                event.preventDefault();
                break;
            case 38:
                if (isOpen) {
                    var prev = this.findPrev(focusedItem);
                    if (prev) {
                        h(this.dropdown.querySelector(".focus"), "focus");
                        c(prev, "focus");
                    }
                } else {
                    i(this.dropdown);
                }
                event.preventDefault();
                break;
            case 27:
                if (isOpen) {
                    i(this.dropdown);
                }
                break;
            case 32:
                if (isOpen) return false;
                break;
        }
        return false;
    }, 
    u.prototype.findNext = function(element) {
        element = element ? element.nextElementSibling : this.dropdown.querySelector(".list .option");
        while (element) {
            if (!a(element, "disabled") && element.style.display !== "none") {
                return element;
            }
            element = element.nextElementSibling;
        }
        return null;
    },
    u.prototype.findPrev = function(element) {
        element = element ? element.previousElementSibling : this.dropdown.querySelector(".list .option:last-child");
        while (element) {
            if (!a(element, "disabled") && element.style.display !== "none") {
                return element;
            }
            element = element.previousElementSibling;
        }
        return null;
    }, 
    u.prototype.onSearchChanged = function(event) {
        const isOpen = a(this.dropdown, "open");
        let searchTerm = event.target.value.toLowerCase();
        if (searchTerm === "") {
            this.options.forEach(option => {
                option.element.style.display = "";
            });
        } else if (isOpen) {
            const regex = new RegExp(searchTerm);
            this.options.forEach(option => {
                const optionText = option.data.text.toLowerCase();
                option.element.style.display = regex.test(optionText) ? "" : "none";
            });
        }
        this.dropdown.querySelectorAll(".focus").forEach(el => {
            h(el, "focus");
        });
        c(this.findNext(null), "focus");
    },
    t
})()));