
var checked = []; 
var data = "assets"+assetType; // assetType is set in each page of assets
// pics is also set in each page - it is an array of pics for that type of asset

var checked, checkedAI, checkedBackings, checkedNature, checkedPeople, checkedThings, checkedSounds;

// localStorage.clear();
if (assetType == "All") {
    checked = [];

    if (localStorage) {
        if (localStorage["assetsAI"]) {
            checkedAI = JSON.parse(localStorage["assetsAI"]);
            checked = checked.concat(checkedAI);
        }
        if (localStorage["assetsBackings"]) {
            checkedBackings = JSON.parse(localStorage["assetsBackings"]);
            checked = checked.concat(checkedBackings);
        }
        if (localStorage["assetsNature"]) {
            checkedNature = JSON.parse(localStorage["assetsNature"]);
            checked = checked.concat(checkedNature);
        }
        if (localStorage["assetsPeople"]) {
            checkedPeople = JSON.parse(localStorage["assetsPeople"]);
            checked = checked.concat(checkedPeople);
        }
        if (localStorage["assetsThings"]) {
            checkedThings = JSON.parse(localStorage["assetsThings"]);
            checked = checked.concat(checkedThings);
        }
        if (localStorage["assetsSounds"]) {
            checkedSounds = JSON.parse(localStorage["assetsSounds"]);
            checked = checked.concat(checkedSounds);
        }
    }
} else {
    if (localStorage && localStorage[data]) checked = JSON.parse(localStorage[data]);
}


function clearPage() {
    zss("pop").display = "block";
}     
zid("clearNo").addEventListener("click", function(e) {                       
    zss("pop").display = "none";   
    e.preventDefault();             
    return false;
});            
zid("clearYes").addEventListener("click", function(e) {          
    
    zss("pop").borderColor = green;
    setTimeout(function(){
        zss("pop").borderColor = red;
        zss("pop").display = "none";   
    }, 750); 
            
    loop(pics, function (pic) {
        zid(pic).checked = false;
    });
    checked = [];
    localStorage[data] = JSON.stringify(checked);
    (e || event).preventDefault();
});

function clearAll() {
    zss("pop2").display = "block";
}              
zid("clearNo2").addEventListener("click", function(e) {                       
    zss("pop2").display = "none";   
    e.preventDefault();
    return false;
});            
zid("clearYes2").addEventListener("click", function(e) {                        
    
    zss("pop2").borderColor = green;
    setTimeout(function(){
        zss("pop2").borderColor = red;
        zss("pop2").display = "none";   
    }, 750);
    
    loop(pics, function (pic) {
        if (pic.match(/^SECTION/)) return;
        zid(pic).checked = false;
    });
    checked = [];
    localStorage["assetsAI"] = JSON.stringify(checked);
    localStorage["assetsBackings"] = JSON.stringify(checked);
    localStorage["assetsNature"] = JSON.stringify(checked);
    localStorage["assetsPeople"] = JSON.stringify(checked);
    localStorage["assetsThings"] = JSON.stringify(checked);
    localStorage["assetsSounds"] = JSON.stringify(checked);
    (e || event).preventDefault();
});   

var tag = zid("pics");
function s(pic) {
    zid(pic).checked = !zid(pic).checked;
    setCheckbox(zid(pic));
}
var lastAudio;
function p(pic) {
    if (lastAudio) lastAudio.pause();
    var audio = lastAudio = new Audio("https://d309knd7es5f10.cloudfront.net/kids/assets/"+pic);
    audio.play();
}
loop(pics, function(pic) {
    var m = pic.match(/SECTION_(.*)/);
    if (m) {     
        tag.innerHTML += "\n<br><div class=barholder><h4 id="+m[1]+" style='font-size:25px; font-weight:normal; text-transform:uppercase; background-color:#555; color:#ddd; padding:8px; margin:50px;'>"+m[1]+"</h4><a href=\"top\" onclick=\"goTop(); return false;\" class=gotop>TOP</a></div>\n";        
    } else {
        var dat = pic.split(".");
        var short = dat[0]; 
        var ext = dat[1];                                
        var added = checked.indexOf(pic) >= 0 ? " checked" : "";

        if (assetType=="All") {          
            tag.innerHTML += "<div class=asset_item><div class=preview2><a href=https://zimjs.org/assets/"+pic+" target=_blank><img width=20 src=https://d309knd7es5f10.cloudfront.net/kids/fs.jpg></a></div><input class=check type=checkbox onchange=setCheckbox(this) id=" + pic + " name=" + pic + added +"> " + pic + "</div>\n";
        } else {
            var whiteCheck = sprites.indexOf(pic) >= 0 ? " class=white" : "";
            var redCheck = animations.indexOf(pic) >= 0 ? " class=red" : "";
            // var previewCheck = sprites.indexOf(pic) >= 0 || animations.indexOf(pic) >= 0 ? "<div class=preview><a href=https://zimjs.org/assets/"+pic+" target=_blank>▲</a></div>" : "";
            if (window.self !== window.top) {
                if (ext == "mp3") {
                    tag.innerHTML += "<figure style='width:200px;'><input class=check type=checkbox onchange=setCheckbox(this) id=" + pic + " name=" + pic + added +"> <figcaption class=title>"+short+"</figcaption><br><a href=javascript:p(\""+pic+"\");><img class=audio src=https://d309knd7es5f10.cloudfront.net/kids/small/soundicon.webp></a></figure>\n";        
                } else {
                    tag.innerHTML += "<figure"+whiteCheck+redCheck+"><div class=preview><a href=https://zimjs.org/assets/"+pic+" target=_blank><img width=20 src=https://d309knd7es5f10.cloudfront.net/kids/fs.jpg></a></div><input style='float:left' type=checkbox onchange=setCheckbox(this) id=" + pic + " name=" + pic + added +"><br><div class=imgHolder><a href=javascript:s(\""+pic+"\");><img src=https://d309knd7es5f10.cloudfront.net/kids/small/"+pic+"></a></div><br><figcaption class=title>"+short+"</figcaption></figure>\n";
                }
            } else {
                if (ext == "mp3") {
                    tag.innerHTML += "<figure style='width:200px;'><a href=javascript:p(\""+pic+"\");><img class=audio src=https://d309knd7es5f10.cloudfront.net/kids/small/soundicon.webp></a></figure>\n";        
                } else {
                    tag.innerHTML += "<figure"+whiteCheck+redCheck+"><div class=imgHolder><a href=https://zimjs.org/assets/"+pic+" target=_blank><img src=https://d309knd7es5f10.cloudfront.net/kids/small/"+pic+"></a></div><br><figcaption class=title>"+short+"</figcaption></figure>\n";
                }
            }
        }
    }
});

function setCheckbox(box) { 
    let list;
    let which;
    if (assetType == "All") {        
        if (ai.includes(box.id)) {list = checkedAI; which="assetsAI";}
        else if (backings.includes(box.id)) {list = checkedBackings; which="assetsBackings";}
        else if (people.includes(box.id)) {list = checkedPeople; which="assetsPeople";}
        else if (nature.includes(box.id)) {list = checkedNature; which="assetsNature";}
        else if (sounds.includes(box.id)) {list = checkedSounds; which="assetsSounds";}
        else if (things.includes(box.id)) {list = checkedThings; which="assetsThings";}
    } else {
        list = checked;
        which = data;
    }
    var index = list.indexOf(box.name);
    if (box.checked) {                
        if (index < 0) list.push(box.name);
    } else {
        if (index >= 0) list.splice(index, 1);
    }
    if (localStorage) localStorage[which] = JSON.stringify(list);    
}       
 
function goBack() {
   window.parent.location.reload();
}
function goTop() {
    // top.document.getElementById("assetsPage").contentWindow.scrollTo(0,0);
    document.documentElement.scrollTo(0,0);
}

function goto(id) {    
    // for dynamically created tags no offsetTop
    document.documentElement.scrollTo(0,zid(id).getBoundingClientRect().top+document.documentElement.scrollTop);
}


if (window.self === window.top) {
    zet("nav").css("display", "none");
    zet("#intro").css("display", "none");
    zet("#help").css("display", "none");
}
