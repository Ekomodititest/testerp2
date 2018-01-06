<?php 
require_once('master_validation.php');
require_once('config/connection.php');
$kelompok	= $_POST['mayor'];//isset($_POST['mayor']) ? ($_POST['mayor']) : ($_GET['mayor']); //$_POST['mayor'];
$kodebarang = $_POST['kodebarang'];
$namabarang = $_POST['namabarang'];
$satuan     = $_POST['satuan'];
$minstok    = $_POST['minstok'];
$konversi   = $_POST['konversi'];
$nokartu    = $_POST['nokartu'];
$method	    = $_POST['method'];
$strx		= 'select 1=1';

switch($method){
	case 'delete':
		$strx="delete from ".$dbname.".log_5masterbarang where kodebarang='".$kodebarang."' and kelompokbarang='".$kelompok."'";
		if(!mysql_query($strx)){
		  echo $_SESSION['lang']['alertfail']." : ".addslashes(mysql_error($conn));
		}		
	break;
	case 'update':
		$strx="update ".$dbname.".log_5masterbarang set namabarang='".$namabarang."',satuan='".$satuan."',minstok=".$minstok.",nokartubin='".$nokartu."', konversi=".$konversi." where kelompokbarang='".$kelompok."' and kodebarang='".$kodebarang."'";
		if(!mysql_query($strx)){
		  echo $_SESSION['lang']['alertfail']." : ".addslashes(mysql_error($conn));
		}			
	break;	
	case 'insert':
		$strx="insert into ".$dbname.".log_5masterbarang(kelompokbarang,kodebarang,namabarang,satuan,minstok,nokartubin,konversi)values('".$kelompok."','".$kodebarang."','".$namabarang."','".$satuan."',".$minstok.",'".$nokartubin."',".$konversi.")";	   
		if(!mysql_query($strx)){
		  echo $_SESSION['lang']['alertfail']." : ".addslashes(mysql_error($conn));
		}		
	break;	
	case 'refresh_data':
		$limit=15;
		$page=0;
		if(isset($_POST['page'])){
		$page=$_POST['page'];
		if($page<0)
		$page=0;
		}
	$offset=$page*$limit;		
	$txtfind=trim($_POST['txtcari']);
	if(isset($txtfind) && ($txtfind!='')){
		$str="select * from ".$dbname.".log_5masterbarang where namabarang like '%".$txtfind."%' order by namabarang asc limit ".$offset.",".$limit." ";	
		$sql="select count(kodebarang) as jmlhrow from ".$dbname.".log_5masterbarang where namabarang like '%".$txtfind."%'";	
	} 
	else {
		$str="select * from ".$dbname.".log_5masterbarang order by namabarang asc limit ".$offset.",".$limit." ";		
		$sql="select count(kodebarang) as jmlhrow from ".$dbname.".log_5masterbarang";	
	}    
	$res=mysql_query($str);
	$no=0;
	$jlhbrs = 0;
$query=mysql_query($sql) or die(mysql_error());
while($jsl=mysql_fetch_object($query)){
$jlhbrs= $jsl->jmlhrow;
}	
	while($bar=mysql_fetch_object($res)){
	  $stru="select * from ".$dbname.".log_5photobarang where kodebarang='".$bar->kodebarang."'";
	  if(mysql_num_rows(mysql_query($stru))>0){
	  	$adx="<img src=images/zoom.png class=resicon height=16px title='".$_SESSION['lang']['view']."' onclick=viewDetailbarang('".$bar->kodebarang."',event)> <img src=images/tool.png class=resicon height=16px title='".$_SESSION['lang']['edit']."'  onclick=editDetailbarang('".$bar->kodebarang."',event)>";
	  }
	  else{
	  	$adx="<img src=images/tool.png class=resicon height=16px title='".$_SESSION['lang']['edit']."' onclick=editDetailbarang('".$bar->kodebarang."',event)>";
	  }  
	  $no+=1;
	  if($bar->konversi == 0) { $status = "No";} else { $status = "Yes";}
		echo"<tr class=rowcontent>
		  <td>".$no."</td>
		  <td>".$bar->kelompokbarang."</td>
		  <td>".$bar->kodebarang."</td>
		  <td>".$bar->namabarang."</td>
		  <td>".$bar->satuan."</td>
		  <td>".$spek[$bar->kodebarang]."</td>
		  <td align=right>".$bar->minstok."</td>
		  <td>".$bar->nokartubin."</td>
		  <td>".$status."</td>
		  <td align=center><input type=checkbox id='br".$bar->kodebarang."' value='".$bar->kodebarang."' ".($bar->inactive==0?"":" checked")." onclick=setInactive(this.value);></td>
		  <td align=center>".$adx."</td>
		  <td>
		      <img src=images/application/application_edit.png class=resicon  title='".$_SESSION['lang']['edit']."' onclick=\"fillField('".$bar->kelompokbarang."','".$bar->kodebarang."','".$bar->namabarang."','".$bar->satuan."','".$bar->minstok."','".$bar->nokartubin."','".$bar->konversi."');\"> 
			  <img src=images/application/application_delete.png class=resicon  title='".$_SESSION['lang']['delete']."' onclick=\"delBarang('".$bar->kodebarang."','".$bar->kelompokbarang."');\">
		  </td>
		  </tr>";
	}
echo "<tr><td colspan=12 align=center>
	".(($page*$limit)+1)." to ".(($page+1)*$limit)." Of ".  $jlhbrs."
	<br />
	<button class=mybutton onclick=cariBast(".($page-1).");>".$_SESSION['lang']['pref']."</button>
	<button class=mybutton onclick=cariBast(".($page+1).");>".$_SESSION['lang']['lanjut']."</button>
	</td>
	</tr>";			
	break;	
	default:
	break;	
}

/*     
$str="select kodebarang, spesifikasi from ".$dbname.".log_5photobarang where kodebarang like '".$kelompok."%'"; 
$res=mysql_query($str);
while($bar= mysql_fetch_object($res)){
    $spek[$bar->kodebarang]=$bar->spesifikasi;
}         
$txtfind=trim($_POST['txtcari']);	
	if(isset($_POST['txtcari']) && $txtfind!='' && $kelompok!='All')
		$str="select * from ".$dbname.".log_5masterbarang where namabarang like '%".$txtfind."%' and kelompokbarang='".$kelompok."' order by namabarang asc";
	else if(isset($_POST['txtcari']) && $txtfind!=='' && $kelompok=='All')
		$str="select * from ".$dbname.".log_5masterbarang where namabarang like '%".$txtfind."%' order by namabarang asc";
	else
	    $str="select * from ".$dbname.".log_5masterbarang where kelompokbarang='".$kelompok."' order by namabarang asc";
	
	$res=mysql_query($str);
	$no=0;
	while($bar=mysql_fetch_object($res)){
	  $stru="select * from ".$dbname.".log_5photobarang where kodebarang='".$bar->kodebarang."'";
	  if(mysql_num_rows(mysql_query($stru))>0){
	  	$adx="<img src=images/zoom.png class=resicon height=16px title='".$_SESSION['lang']['view']."' onclick=viewDetailbarang('".$bar->kodebarang."',event)> <img src=images/tool.png class=resicon height=16px title='".$_SESSION['lang']['edit']."'  onclick=editDetailbarang('".$bar->kodebarang."',event)>";
	  }
	  else{
	  	$adx="<img src=images/tool.png class=resicon height=16px title='".$_SESSION['lang']['edit']."' onclick=editDetailbarang('".$bar->kodebarang."',event)>";
	  }  
	  $no+=1;
	  if($bar->konversi == 0) { $status = "No";} else { $status = "Yes";}
		echo"<tr class=rowcontent>
		  <td>".$no."</td>
		  <td>".$bar->kelompokbarang."</td>
		  <td>".$bar->kodebarang."</td>
		  <td>".$bar->namabarang."</td>
		  <td>".$bar->satuan."</td>
		  <td>".$spek[$bar->kodebarang]."</td>
		  <td align=right>".$bar->minstok."</td>
		  <td>".$bar->nokartubin."</td>
		  <td>".$status."</td>
		  <td align=center><input type=checkbox id='br".$bar->kodebarang."' value='".$bar->kodebarang."' ".($bar->inactive==0?"":" checked")." onclick=setInactive(this.value);></td>
		  <td align=center>".$adx."</td>
		  <td>
		      <img src=images/application/application_edit.png class=resicon  title='".$_SESSION['lang']['edit']."' onclick=\"fillField('".$bar->kelompokbarang."','".$bar->kodebarang."','".$bar->namabarang."','".$bar->satuan."','".$bar->minstok."','".$bar->nokartubin."','".$bar->konversi."');\"> 
			  <img src=images/application/application_delete.png class=resicon  title='".$_SESSION['lang']['delete']."' onclick=\"delBarang('".$bar->kodebarang."','".$bar->kelompokbarang."');\">
		  </td>
		  </tr>";
	}
*/
?>
