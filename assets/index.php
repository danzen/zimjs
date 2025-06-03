<?php
$path = realpath('.');
$objects = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path), RecursiveIteratorIterator::SELF_FIRST);
$pics = [];
$other = [];


foreach ($objects as $filename=>$cur) {
    $filesize=$cur->getSize();
    // if (preg_match('/^.+\.html$/i', $filename)) {

        if (!preg_match("/\./i", $filename)) continue;
        if (preg_match("/htaccess/i", $filename)) continue;
        if (preg_match("/ajax/i", $filename)) continue;
        if (preg_match("/\/\.$/i", $filename)) continue;
        if (preg_match("/\/\.\.$/i", $filename)) continue;

        $filename = preg_replace("/\/home\/danzen\/public_html\/code\//", "https://zimjs.com/", $filename);



        $line = "<li><a href=$filename target=_blank style=\"font-size: min(3vw, 20px);\">$filename</a></li>\n";
        if (preg_match("/png|jpg/i", $filename)) {
            array_push($pics, $line);
        } else {
            array_push($other, $line);
        }
        
    // }

}

echo "<div id=IMAGES></div><a href=#IMAGES>IMAGES</a> | <a href=#MISC>MISC</a><br><br>IMAGES<br><ol>\n";
sort($pics);
foreach($pics as $line) {
    echo $line;
}
echo "</ol>\n";

echo "<div id=MISC></div><br><hr><br><a href=#IMAGES>IMAGES</a> | <a href=#MISC>MISC</a><br>\n";

echo "<br>SOUNDS, FONTS, ETC.<br><ol>\n";
sort($other);
foreach($other as $line) {
    echo $line;
}

echo "</ol>\n";

?>
