<?
#$dbserver ='localhost';
#$dbname   ='erptes';
#$uname    ='root';
#$passwd   ='';

$dbserver ='192.168.0.250';
$dbname   ='eptmstes';
$uname    ='admin1';
$passwd   ='159753';

@$conn=mysql_connect($dbserver.":".$dbport,$uname,$passwd) or die("Error/Gagal :Unable to Connect to database ".$dbname);
$mysqli = new mysqli($dbserver, $uname, $passwd, $dbname);
mysql_select_db($dbname);
require_once('lib/eksilib.php');
?>
