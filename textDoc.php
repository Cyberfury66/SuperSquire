<?php

$handle = fopen('D:\Programs\php-5.6.21-nts-Win32-VC11-x86\leaderboard.csv', 'rw');
$rows = [];
$top5 = [0,1,2,3,4];//first five indexes to start
//say the first element is username and second is score
rewind($handle);
while(($row = fgetcsv($handle))!==false){
    $rows[] = $row;
}
if($_POST['username'] !==false) {
    $i;
    for($i = 0; $i <count($rows); $i++){
        if($rows[i][0] == $_POST['username']){
            if($rows[i][1] < $_POST['score']) {
                $rows[i][1] = $_POST['score'];
            }
            break;
        }
    }
    if($i==count($rows)){
        $rows[] = [$_POST['username'], $_POST['score']];
    }
}
rewind($handle);
header('Content-type: application/json');
if(count($rows)<5){
    echo json_encode($rows);
}
else{
    for($i=0;$i<count($rows);$i++){
        for($j=0;$j<5;$j++){
            if($rows[i][1]>$rows[$top5[j]][1]){
                $top5[j] = i;
                break;
            }
        }
    }
    echo json_encode([
        $rows[$$top5[0]],
        $rows[$$top5[1]],
        $rows[$$top5[2]],
        $rows[$$top5[3]],
        $rows[$$top5[4]]
        ]);
}
foreach($rows as $row) {
    fputcsv($handle,$row);
}
fclose($handle);
?>
