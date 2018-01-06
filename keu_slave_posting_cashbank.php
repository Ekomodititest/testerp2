<?php
require_once('master_validation.php');
require_once('config/connection.php');
require_once('lib/nangkoelib.php');
require_once('lib/zLib.php');

function insertjurnal($nRefno){
	require_once('lib/eksilib.php');
	$ex=new eksi;
	$ssql="SELECT ncounter,tipetransaksi FROM keu_cashbankh WHERE status=3 AND ncounter='".$nRefno."' limit 1";
	$x=$ex->ssql($ssql);
	$validreffno="";
	$tipe="";
	
	foreach($x as $row){
		$validreffno=$row['ncounter'];	
		$tipe=$row['tipetransaksi'];	
	}
	if ($validreffno!=""){
		createheader($nRefno,$tipe);		
	}	
}

function getloktugas($nRefno){
	require_once('lib/eksilib.php');
	$ssql="SELECT kodeorg FROM keu_jurnaldt WHERE noreferensi='".$nRefno."' LIMIT 1";
	$ressql=$eksi->sSQL($ssql);
	foreach($ressql as $barsql){
		$lokasitugas=$barsql['kodeorg'];
	}
	
	return $lokasitugas;
}

function getRefno($tanggal,$tipe,$refno){
	require_once('lib/eksilib.php');
	$ex=new eksi;
	$ssql="SELECT nojurnal FROM keu_jurnalht WHERE noreferensi='".$refno."' LIMIT 1";
	$x=$ex->ssql($ssql);
	$nojurnal="";
	foreach($x as $row){
		$nojurnal=$row['nojurnal'];
	}
	
	
	if(trim($nojurnal)!=""){
		return $nojurnal;
	}
	/*create no jurnal*/
	$ssql="SELECT nojurnal FROM keu_jurnalht WHERE nojurnal LIKE '".$tanggal."/".$_SESSION['empl']['lokasitugas']."/CB".$tipe."/%' ORDER BY nojurnal DESC LIMIT 1";
	$x=$ex->ssql($ssql);
	$nojurnal=$tanggal."/".getloktugas($refno)."/CB".$tipe."/0001";
	foreach($x as $row1){
		$x=intval(substr(trim($row1['nojurnal']),strlen($tanggal."/".$_SESSION['empl']['lokasitugas']."/CB".$tipe."/")+1,4))+1;
		
		$counter="0000".$x;
		$counter=substr(trim($counter),strlen(trim($counter))-4,4);
		$nojurnal=$tanggal."/".$_SESSION['empl']['lokasitugas']."/CB".$tipe."/".$counter;
	}
	//echo "warning :".$nojurnal." \n".$ssql;
	//exit();
	return $nojurnal;
	
	
}
function createheader($reffno,$tipe){
	require_once('lib/eksilib.php');
	$ex=new eksi;
	$ssql="SELECT * FROM keu_cashbankh 
		   WHERE nCounter='".$reffno."' AND tipetransaksi='".$tipe."' LIMIT 1";
	$x=$ex->ssql($ssql);
	foreach($x as $row){
		$srefno=getRefno($row['tglTransaksi'],$tipe,$row['nCounter']);
		if(trim($srefno)==""){
			return;
		}
		$data=array(
		'nojurnal'=>"'".$srefno."'",
		'kodejurnal'=>"'CB".$tipe."'",
		'tanggal'=>"'".$ex->ymd($row['tglTransaksi'])."'",
		'tanggalentry'=>"'".date('Y-m-d')."'",
		'totaldebet'=>"".intval($row['amount'])."",
		'totalkredit'=>"-".intval($row['amount'])."",
		'noreferensi'=>"'".$row['nCounter']."'",
		'matauang'=>"'IDR'",
		'kurs'=>"1",
		'posting'=>"0",
		'amountkoreksi'=>"0",
		'autojurnal'=>"1",
		'revisi'=>"0",
		'isDelete'=>"0");
		$ex->hapus('keu_jurnalht'," where nojurnal='".$srefno."'");
		$ex->hapus('keu_jurnaldt'," where nojurnal='".$srefno."'");
		$ssql=$ex->genSQL('keu_jurnalht',$data,false);
		$ex->exc($ssql);
		
		#exit( "warning:".$ssql);
		createdetail($srefno,$row['nCounter']);
		
	/*	
	$ssql="UPDATE keu_cashbankh SET status=3  
		   WHERE nCounter='".$reffno."' AND tipetransaksi='".$tipe."'";
	$ex->exc($ssql);
	*/
	}
}

function createdetail($nojurnal,$refno){
	require_once('lib/eksilib.php');
	$ex=new eksi;
	$n=1;
	$ssql="SELECT tglTransaksi,accountid,
		   CASE WHEN IFNULL(sourceno,' ')<>' ' THEN concat(keterangan,' ','Source No : ',sourceno) ELSE keterangan END as keterangan,
		   amount,tipetransaksi,lokasitugas
		   FROM keu_cashbankh WHERE nCounter='".$refno."' LIMIT 1";
	//exit( "warning:".$ssql);
	$x=$ex->sSQL($ssql);
	$tanggal="";
	$keterangan="";
	$cek="";
	$kdorg="";
	foreach($x as $row){
		$amount=$row['amount'];
		if($row['tipetransaksi']!='DP'){
			$amount=-1*$row['amount'];
		}
		$kdorg=$row['lokasitugas'];
		$data=array(
		'nojurnal'=>"'".$nojurnal."'",
		'tanggal'=>"'".$ex->ymd($row['tglTransaksi'])."'",
		'nourut'=>"'".$n."'",
		'noakun'=>"'".$row['accountid']."'",
		'keterangan'=>"'".$row['keterangan']."'",
		'jumlah'=>"".$amount."",
		'matauang'=>"'IDR'",
		'kurs'=>"1",
		'kodeorg'=>"'".getloktugas($refno)."'",
		'noreferensi'=>"'".$refno."'",
		'nodok'=>"'".$refno."'",
		'kodebarang'=>"''",
		'revisi'=>"0"
		);
		$tanggal=$ex->ymd($row['tglTransaksi']);
		$keterangan=$row['keterangan'];
		$cek=$row['tipetransaksi'];
		$ssql=$ex->genSQL('keu_jurnaldt',$data,false);
		//exit( "warning:".$ssql);
		$ex->exc($ssql);
	$n++;
	}
	
	$ssql="SELECT * FROM keu_cashbankd WHERE nCounter='".$refno."'";
	$s=$ex->sSQL($ssql);	
	foreach($s as $row1){			
		$amount=$row1['amount'];
		if($cek=='DP'){
			$amount=-1*$row1['amount'];
		}
		$data1=array(
		'nojurnal'=>"'".$nojurnal."'",
		'tanggal'=>"'".$tanggal."'",
		'nourut'=>"'". $n."'",
		'noakun'=>"'".$row1['accountID']."'",
		'keterangan'=>"'".$keterangan." - ".$row1['keterangan']."'",
		'jumlah'=>"".intval($amount)."",
		'matauang'=>"'IDR'",
		'kurs'=>"1",
		'kodeorg'=>"'".getloktugas($refno)."'",
		'noreferensi'=>"'".$refno."'",
		'nodok'=>"'".$refno."'",
		'kodebarang'=>"''",
		'revisi'=>"0"
		);
		$ssql1=$ex->genSQL('keu_jurnaldt',$data1,false);
		$ex->exc($ssql1);
	$n++;
	}
		
	
}

//fungsi untuk insert ke tabel cip jika merupakan cip ==Jo 30-03-2017==
function insertcip($reffno){
	require_once('lib/eksilib.php');
	
	$ex=new eksi;
	$ssql="SELECT * FROM keu_cashbankh 
		   WHERE status=3 AND nCounter='".$reffno."' LIMIT 1";
	$x=$ex->ssql($ssql);
	$cipacby="";
	foreach($x as $row){
		
			$slasset="select ifnull(a.isPosting,0)as isPosting,b.akunak as cipacc, a.noakun as akunbiaya from log_cipht a left join sdm_5tipeasset b on a.kodetipe=b.kodetipe where a.nocip='".$row['sourceNo']."'";
			$resasset=$ex->sSQL($slasset);
			foreach($resasset as $barasset){
				//$cipacc=$barasset['cipacc'];
				$cipacby=$barasset['akunbiaya'];
				//$cipposting=$barasset['isPosting'];
			}
			
			$hargasatuancip=$row['amount'];
			$jmms1=0;
			$jmms2=0;
			$slcip="select keterangan from log_cipht where nocip='".$row['sourceNo']."'";
			$rescip=$ex->sSQL($slcip);
			foreach($rescip as $barcip){
				$ketcip=$barcip['keterangan'];
			}
			//insert ke log_cipdt_for_jurnal untuk menambah asset ==Jo 30-03-2017==
			$slbarang="select kodebarang from log_5masterbarang where itemNonPo=1";
			$resbarang=$ex->sSQL($slbarang);
			$sumbarang=$ex->sSQLnum($slbarang);
			foreach($resbarang as $barbarang){
				
				$inscipdt=array("nocip"=>"'".$row['sourceNo']."'",
				  "jumlah"=>"1",
				  "kodebarang"=>"'".$barbarang['kodebarang']."'",
				  "hargasatuan"=>"'".$hargasatuancip."'",
				  "keterangan"=>"'".$row['keterangan']."'",
				  "docno"=>"'".$reffno."'",
				  "create_by"=>"'".$_SESSION['standard']['userid']."'",
				  "isgrn"=>"1");
				$stringcipdt=$ex->genSQL('log_cipdt',$inscipdt,false);
				$qcipdt=$ex->exc($stringcipdt);
				if ($qcipdt){
					$jmms2++;
				}
				$ssql="SELECT `id` as urut FROM log_cipdt WHERE nocip='".$row['sourceNo']."' AND kodebarang='".$barbarang['kodebarang']."' AND docno='".$reffno."' ORDER BY urut DESC LIMIT 1";
				$rxc=$ex->sSQL($ssql);
				$cipdtid=0;
				foreach($rxc as $r1)
				{
					$cipdtid=$r1['urut'];
				}
				
				$query3="select kodetipe,noakun from log_cipht where nocip='".$row['sourceNo']."' limit 0,1";
				$rb=$ex->sSQL($query3);				
				foreach($rb as $r3)
				{
					$cipacby=$r3['noakun'];
				}
				
				$inscipjn=array("nocip"=>"'".$row['sourceNo']."'",
				  "kodebarang"=>"'".$barbarang['kodebarang']."'",
				  "noakunasset"=>"'".$cipacby."'",
				  "jumlah"=>"1",
				  "hargasatuan"=>"".$hargasatuancip."",
				  "subtotal"=>"".$hargasatuancip."",
				  "isAsset"=>"0",
				  "keterangan"=>"'".$row['keterangan']."'",
				  "cipdtid"=>"".$cipdtid."",
				  "create_by"=>"'".$_SESSION['standard']['userid']."'");
				$stringcipjrdt=$ex->genSQL('log_cipdt_for_jurnal',$inscipjn,false);
				$qcipjrdt=$ex->exc($stringcipjrdt);
				if ($qcipjrdt){
					$jmms1++;
				}
				//echo "warning: ".$stringcipjrdt;
				
			}
			//echo "warning: ".$jmms." ".$sumbarang;
			if ($jmms1==$sumbarang && $jmms2==$sumbarang){
				echo $_SESSION['lang']['dataposted'];
			}
			else {
				//tambahan jika CIP sudah ada di tabel log_cipdt_for_jurnal tidak akan bisa masuk, jadi rollback status
				$eksi->lock('keu_cashbankh');
				$ssql="UPDATE keu_cashbankh SET status=0 WHERE ncounter='".$reffno."'";
				$hasil=$eksi->exc($ssql);
				$eksi->unlock();
				echo $_SESSION['lang']['simpangagal'];
			}
		
		
	}
}


$sSQL="SELECT kode,nama FROM setup_5parameter WHERE flag='stpostbyr'";
$n=$eksi->sSQL($sSQL);
$optPosting="";
foreach($n as $row){
	$optPosting.="<option value='".$row['kode']."'>".strtoupper($row['nama'])."</option>";
}

$method="";
$method=$_POST['method'];
switch(true)
{
	case ($method=='POSTING'):
		//ambil kode CIP
		$slcip="select kode from  setup_5parameter where flag='dokcip'";
		$rescip=$eksi->sSQL($slcip);
		foreach($rescip as $barcip){
			$dokcip=$barcip['kode'];
		}
		$eksi->lock('keu_cashbankh');
		$ssql="UPDATE keu_cashbankh SET status=3 WHERE ncounter='".$_POST['ncounter']."'";
		//$hasil=$eksi->exc($ssql);
		$eksi->exc($ssql);
		$eksi->unlock();
		insertjurnal($_POST['ncounter']);
		$slsource="select sourceID from keu_cashbankh where ncounter='".$_POST['ncounter']."'";
		$ressource=$eksi->sSQL($slsource);
		foreach($ressource as $barsource){
			//echo "warning: ".$barsource['sourceID'];
			if($barsource['sourceID']==$dokcip){
				insertcip($_POST['ncounter']);//fungsi untuk insert ke tabel cip jika merupakan cip ==Jo 30-03-2017==
			}
			else{
				echo $_SESSION['lang']['alertposting'];
			}
		}
		
			
	break;
	
	case ($method=='LOADDATADEPOSIT'):
		if ($_SESSION['empl']['pusat']==1){
			$query = selectQuery($dbname,'organisasi',"induk,kodeorganisasi"," induk='".$_SESSION['empl']['kodeorganisasi']."'");
			$rs = fetchData($query);
			#pre($rs);exit();
			$LokasiTugas = "and a.lokasitugas in (";
			foreach($rs as $key => $value){
				if(end($rs) !== $value){
					$LokasiTugas.= "'".$value['kodeorganisasi']."',";
				}else {
					$LokasiTugas.= "'".$value['kodeorganisasi']."'";
				}
			}
			$LokasiTugas.=")";
			#echo $LokasiTugas;
			#$induk=$rs[0]['induk'];
		}else{
			$LokasiTugas ="and a.lokasitugas = '".$_SESSION['empl']['lokasitugas']."'";		
		}
		
		
		$ssql="SELECT DISTINCT a.tglTransaksi,a.Reffno, a.amount, a.Keterangan, a.status,a.ncounter 
			   FROM `keu_cashbankh` a ,`keu_cashbankd` b
			   WHERE a.ncounter=b.ncounter AND a.kodeorganisasi='".$_SESSION['empl']['kodeorganisasi']."'
			   AND a.tipetransaksi='".$_POST['flag']."'";
		/*if(!$_SESSION['org']['pusat']){
			$ssql.=" AND a.usercrt=(SELECT x.karyawanid FROM datakaryawan x 
									WHERE x.karyawanid=a.usercrt 
									AND x.lokasitugas='".$_SESSION['empl']['lokasitugas']."' LIMIT 1) ";
		}*/
		$ssql.=" AND a.status IN (".$_SESSION['lang']['defaultStatusCB'].") AND a.amount=(select sum(b.amount) from `keu_cashbankd` b WHERE b.nCounter=a.nCounter) AND a.amount>0 ".$LokasiTugas."";
		#echo $ssql;
		$n=$eksi->sSQL($ssql);
		$hasil="";
		$i=1;
		foreach($n as $row){
			$hasil.="<tr class='rowcontent'>
					<input type='hidden' id='ncounter_".$i."' value='".$row['ncounter']."'>
					<td width=10>".$i."</td>
					<td>".$row['ncounter']."</td>
					<td align=center>".$eksi->dmy($row['tglTransaksi'])."</td>
					<td>".$row['Reffno']."</td>
					<td align=right>".number_format($row['amount'])."</td>
					<td>".$row['Keterangan']."</td>
					<td align=center><img src='images/".$_SESSION['theme']."/pdf.jpg' class='zImgBtn' onclick=\"detailPDF('".$i."',event)\">";
			if(intval($row['status'])==3){
				$hasil.="<strong>POSTED</strong>";
			}else{
				//tambah id row supaya bisa posting acak ==Jo 26-04-2017==
				$hasil.="<select id=pilihstatus_".$i." onchange=\"clickPosting('".$row['ncounter']."','".$i."');\">".$optPosting."</select>";
			}
			$hasil.="</td>
					</tr>";	
		$i++;
		}
		echo $hasil;
		
	break;
	case ($method=='CARIDATADEPOSIT'):
		if ($_SESSION['empl']['pusat']==1){
			$query = selectQuery($dbname,'organisasi',"induk,kodeorganisasi"," induk='".$_SESSION['empl']['kodeorganisasi']."'");
			$rs = fetchData($query);
			#pre($rs);exit();
			$LokasiTugas = "and a.lokasitugas in (";
			foreach($rs as $key => $value){
				if(end($rs) !== $value){
					$LokasiTugas.= "'".$value['kodeorganisasi']."',";
				}else {
					$LokasiTugas.= "'".$value['kodeorganisasi']."'";
				}
			}
			$LokasiTugas.=")";
			#echo $LokasiTugas;
			#$induk=$rs[0]['induk'];
		}else{
			$LokasiTugas ="and a.lokasitugas = '".$_SESSION['empl']['lokasitugas']."'";		
		}
		
		$ssql="SELECT DISTINCT a.tglTransaksi,a.Reffno, a.amount, a.Keterangan, a.status,a.ncounter 
			   FROM `keu_cashbankh` a ,`keu_cashbankd` b
			   WHERE a.ncounter=b.ncounter AND a.kodeorganisasi='".$_SESSION['empl']['kodeorganisasi']."'
			   AND a.tipetransaksi='".$_POST['flag']."'";
		/*if(!$_SESSION['org']['pusat']){
			$ssql.=" AND a.usercrt=(SELECT x.karyawanid FROM datakaryawan x 
									WHERE x.karyawanid=a.usercrt 
									AND x.lokasitugas='".$_SESSION['empl']['lokasitugas']."' LIMIT 1) ";
		}*/
		$ssql.=" AND a.status IN (".$_SESSION['lang']['defaultStatusCB'].") AND a.amount=(select sum(b.amount) from `keu_cashbankd` b WHERE b.nCounter=a.nCounter) AND a.amount>0 ".$LokasiTugas."";
		$filter=$_POST['filter'];
		$keyword=$_POST['keyword'];
		if ($filter!=""){
			if ($filter=='a.tglTransaksi'){
				$keyword=str_replace('-','',$eksi->ymd($keyword));
			}
			$ssql.="AND ".$filter." LIKE '%".$keyword."%'";
		}
		
		$n=$eksi->sSQL($ssql);
		$hasil="";
		$i=1;
		foreach($n as $row){
			$hasil.="<tr class='rowcontent'>
					<input type='hidden' id='ncounter_".$i."' value='".$row['ncounter']."'>
					<td width=10>".$i."</td>
					<td>".$row['ncounter']."</td>
					<td align=center>".$eksi->dmy($row['tglTransaksi'])."</td>
					<td>".$row['Reffno']."</td>
					<td align=right>".number_format($row['amount'])."</td>
					<td>".$row['Keterangan']."</td>
					<td align=center><img src='images/".$_SESSION['theme']."/pdf.jpg' class='zImgBtn' onclick=\"detailPDF('".$i."',event)\">";
			if(intval($row['status'])==3){
				$hasil.="<strong>POSTED</strong>";
			}else{
				//tambah id row supaya bisa posting acak ==Jo 26-04-2017==
				$hasil.="<select id=pilihstatus_".$i." onchange=\"clickPosting('".$row['ncounter']."','".$i."');\">".$optPosting."</select>";
			}
			$hasil.="</td>
					</tr>";	
		$i++;
		}
		echo $hasil;
		
	break;
	default:
	break;
}	

?>