﻿/*
 Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function(){function g(a){return CKEDITOR.tools.capitalize(a,!0)}function p(a,c){function b(a){return function(b,c){var e=b.widgets.focused,h=CKEDITOR.TRISTATE_DISABLED;e&&"easyimage"===e.name&&(h=a&&a.call(this,e,b,c)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF);this.setState(h)}}function f(a,c,d,e){d.type="widget";d.widget="easyimage";d.group=d.group||"easyimage";d.element="figure";c=new CKEDITOR.style(d);a.filter.allow(c);c=new CKEDITOR.styleCommand(c);c.contextSensitive=!0;c.refresh=b(function(a,
b,c){return this.style.checkActive(c,b)});a.addCommand(e,c);c=a.getCommand(e);c.enable=function(){};c.refresh(a,a.elementPath());return c}a.addCommand("easyimageAlt",new CKEDITOR.dialogCommand("easyimageAlt",{startDisabled:!0,contextSensitive:!0,refresh:b()}));(function(b){function c(a,b){var d=a.match(/^easyimage(.+)$/);if(d){var f=(d[1][0]||"").toLowerCase()+d[1].substr(1);if(d[1]in b)return d[1];if(f in b)return f}return null}a.on("afterCommandExec",function(e){c(e.data.name,b)&&(a.forceNextSelectionCheck(),
a.selectionChange(!0))});a.on("beforeCommandExec",function(e){c(e.data.name,b)&&e.data.command.style.checkActive(e.editor.elementPath(),a)&&(e.cancel(),a.focus())});for(var d in b)f(a,d,b[d],"easyimage"+g(d))})(c)}function q(a){var c=a.config.easyimage_toolbar;a.plugins.contextmenu&&(c.split&&(c=c.split(",")),a.addMenuGroup("easyimage"),CKEDITOR.tools.array.forEach(c,function(b){b=a.ui.items[b];a.addMenuItem(b.name,{label:b.label,command:b.command,group:"easyimage"})}))}function r(a){var c=a.sender.editor,
b=c.config.easyimage_toolbar;b.split&&(b=b.split(","));CKEDITOR.tools.array.forEach(b,function(b){b=c.ui.items[b];a.data[b.name]=c.getCommand(b.command).state})}function t(a,c){var b=a.config,f=b.easyimage_class,b={name:"easyimage",allowedContent:{figure:{classes:b.easyimage_sideClass},img:{attributes:"!src,srcset,alt,width,sizes"}},requiredContent:"figure; img[!src]",styleableElements:"figure",supportedTypes:new RegExp("image/("+l.join("|")+")","i"),loaderType:CKEDITOR.plugins.cloudservices.cloudServicesLoader,
progressReporterType:CKEDITOR.plugins.imagebase.progressBar,upcasts:{figure:function(a){if((!f||a.hasClass(f))&&1===a.find("img",!0).length)return a}},init:function(){function b(a,c){var d=a.$;if(d.complete&&d.naturalWidth)return c(d.naturalWidth);a.once("load",function(){if(!d.naturalWidth)return d.src=d.src,b(a,c);c(d.naturalWidth)})}var c=this.parts.image,d=c&&c.$.complete&&!c.$.naturalWidth;if(c&&!c.$.complete||d)d&&(c.$.src=c.$.src),b(c,function(){a._.easyImageToolbarContext.toolbar.reposition()});
c=this.element.data("cke-upload-id");"undefined"!==typeof c&&(this.setData("uploadId",c),this.element.data("cke-upload-id",!1));this.on("contextMenu",r);a.config.easyimage_class&&this.addClass(a.config.easyimage_class);this.on("uploadStarted",function(){var a=this;b(a.parts.image,function(b){a.parts.image.hasAttribute("width")||(a.editor.fire("lockSnapshot"),a.parts.image.setAttribute("width",b),a.editor.fire("unlockSnapshot"))})});this.on("uploadDone",function(a){a=a.data.loader.responseData.response;
var b=CKEDITOR.plugins.easyimage._parseSrcSet(a);this.parts.image.setAttributes({"data-cke-saved-src":a["default"],src:a["default"],srcset:b,sizes:"100vw"})});this.on("uploadFailed",function(){alert(this.editor.lang.easyimage.uploadFailed)});this._loadDefaultStyle()},_loadDefaultStyle:function(){var b=!1,f=a.config.easyimage_defaultStyle,d;for(d in c){var e=a.getCommand("easyimage"+g(d));!b&&e&&e.style&&-1!==CKEDITOR.tools.array.indexOf(e.style.group,"easyimage")&&this.checkStyleActive(e.style)&&
(b=!0)}!b&&f&&a.getCommand("easyimage"+g(f))&&this.applyStyle(a.getCommand("easyimage"+g(f)).style)}};f&&(b.requiredContent+="(!"+f+")",b.allowedContent.figure.classes="!"+f+","+b.allowedContent.figure.classes);a.plugins.link&&(b=CKEDITOR.plugins.imagebase.addFeature(a,"link",b));b=CKEDITOR.plugins.imagebase.addFeature(a,"upload",b);b=CKEDITOR.plugins.imagebase.addFeature(a,"caption",b);CKEDITOR.plugins.imagebase.addImageWidget(a,"easyimage",b)}function u(a){var c=new RegExp("\x3cimg[^\x3e]*\\ssrc\x3d[\\'\\\"]?data:image/("+
l.join("|")+");base64,","i");a.on("paste",function(b){if(!a.isReadOnly&&c.test(b.data.dataValue)){b=b.data;var f=document.implementation.createHTMLDocument(""),f=new CKEDITOR.dom.element(f.body),g=a.widgets.registered.easyimage,l=0,d,e,h,m;f.data("cke-editable",1);f.appendHtml(b.dataValue);e=f.find("img");for(m=0;m<e.count();m++){h=e.getItem(m);var k=(d=h.getAttribute("src"))&&"data:"==d.substring(0,5),n=null===h.data("cke-realelement");k&&n&&!h.isReadOnly(1)&&(l++,1<l&&(k=a.getSelection().getRanges(),
k[0].enlarge(CKEDITOR.ENLARGE_ELEMENT),k[0].collapse(!1)),d.match(/image\/([a-z]+?);/i),k=g._spawnLoader(a,d,g),d=g._insertWidget(a,g,d,!1,{uploadId:k.id}),d.data("cke-upload-id",k.id),d.replace(h))}b.dataValue=f.getHtml()}})}function v(a){a.ui.addButton("EasyImageUpload",{label:a.lang.easyimage.commands.upload,command:"easyimageUpload",toolbar:"insert,1"});a.addCommand("easyimageUpload",{exec:function(){var c=CKEDITOR.dom.element.createFromHtml('\x3cinput type\x3d"file" accept\x3d"image/*" multiple\x3d"multiple"\x3e');
c.once("change",function(b){b=b.data.getTarget();b.$.files.length&&a.fire("paste",{method:"paste",dataValue:"",dataTransfer:new CKEDITOR.plugins.clipboard.dataTransfer({files:b.$.files})})});c.$.click()}})}var n=!1,l=["jpeg","png","gif","bmp"];CKEDITOR.plugins.easyimage={_parseSrcSet:function(a){var c=[],b;for(b in a)"default"!==b&&c.push(a[b]+" "+b+"w");return c.join(", ")}};CKEDITOR.plugins.add("easyimage",{requires:"imagebase,balloontoolbar,button,dialog,cloudservices",lang:"ar,az,bg,cs,da,de,de-ch,el,en,en-au,et,fa,fr,gl,hr,hu,it,ku,lv,nb,nl,no,pl,pt,pt-br,ro,ru,sk,sq,sr,sr-latn,sv,tr,tt,uk,zh,zh-cn",
icons:"easyimagefull,easyimageside,easyimagealt,easyimagealignleft,easyimagealigncenter,easyimagealignright,easyimageupload",hidpi:!0,onLoad:function(){CKEDITOR.dialog.add("easyimageAlt",this.path+"dialogs/easyimagealt.js")},isSupportedEnvironment:function(){return!CKEDITOR.env.ie||11<=CKEDITOR.env.version},init:function(a){this.isSupportedEnvironment()&&(n||(CKEDITOR.document.appendStyleSheet(this.path+"styles/easyimage.css"),n=!0),a.addContentsCss&&a.addContentsCss(this.path+"styles/easyimage.css"))},
afterInit:function(a){if(this.isSupportedEnvironment()){var c;c=CKEDITOR.tools.object.merge({full:{attributes:{"class":"easyimage-full"},label:a.lang.easyimage.commands.fullImage},side:{attributes:{"class":"easyimage-side"},label:a.lang.easyimage.commands.sideImage},alignLeft:{attributes:{"class":"easyimage-align-left"},label:a.lang.common.alignLeft},alignCenter:{attributes:{"class":"easyimage-align-center"},label:a.lang.common.alignCenter},alignRight:{attributes:{"class":"easyimage-align-right"},
label:a.lang.common.alignRight}},a.config.easyimage_styles);t(a,c);u(a);p(a,c);a.ui.addButton("EasyImageAlt",{label:a.lang.easyimage.commands.altText,command:"easyimageAlt",toolbar:"easyimage,3"});for(var b in c)a.ui.addButton("EasyImage"+g(b),{label:c[b].label,command:"easyimage"+g(b),toolbar:"easyimage,99",icon:c[b].icon,iconHiDpi:c[b].iconHiDpi});q(a);c=a.config.easyimage_toolbar;a._.easyImageToolbarContext=a.balloonToolbars.create({buttons:c.join?c.join(","):c,widgets:["easyimage"]});v(a)}}});
CKEDITOR.config.easyimage_class="easyimage";CKEDITOR.config.easyimage_styles={};CKEDITOR.config.easyimage_defaultStyle="full";CKEDITOR.config.easyimage_toolbar=["EasyImageFull","EasyImageSide","EasyImageAlt"]})();