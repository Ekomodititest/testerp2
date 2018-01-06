<?php
require_once('master_validation.php');
require_once('config/connection.php');
require_once('lib/nangkoelib.php');

$method=$_POST['method'];
$vendor=$_POST['vendor'];
$bank=$_POST['bank'];
$dok=$_POST['dok'];
$transno=$_POST['transno'];

$kurs=0;
$total=0;
$diskon=0;
$nett=0;
$persenppn=0;
$nilaippn=0;
$persenpph=0;
$persenpbbkb=0;
$nilaipbbkb=0;
$subtotal=0;
$penambah=0;
$pengurang=0;
$grandtotal=0;


$nocounter=$_POST['nocounter'];
$status=$_POST['status'];
$totalbayar=$_POST['totalbayar'];
//ambil kode PO di setup_5parameter
$slpo="select kode from  setup_5parameter where flag='dokpo'";
$respo=$eksi->sSQL($slpo);
foreach($respo as $barpo){
	$dokpo=$barpo['kode'];
}
//ambil kode SPK di setup_5parameter
$slspk="select kode from  setup_5parameter where flag='dokspk'";
$resspk=$eksi->sSQL($slspk);
foreach($resspk as $barspk){
	$dokspk=$barspk['kode'];
}
//ambil kode BA SPK di setup_5parameter
$slbaspk="select kode from  setup_5parameter where flag='dokbaspk'";
$resbaspk=$eksi->sSQL($slbaspk);
foreach($resbaspk as $barbaspk){
	$dokbaspk=$barbaspk['kode'];
}
//ambil kode CIP di setup_5parameter
$slcip="select kode from  setup_5parameter where flag='dokcip'";
$rescip=$eksi->sSQL($slcip);
foreach($rescip as $barcip){
	$dokcip=$barcip['kode'];
}
//ambil kode Lain2 di setup_5parameter
$slln="select kode from setup_5parameter where flag='dokln'";
$resln=$eksi->sSQL($slln);
foreach($resln as $barln){
	$dokln=$barln['kode'];
}


//cari status posting di setup_5parameter ==Jo 09-02-2017==
$slstatus="select kode from setup_5parameter where flag='statuspost' order by kode asc";
$resstatus=$eksi->sSQL($slstatus);
foreach($resstatus as $barstatus){
	$statpost=$barstatus['kode'];
}

//cari status daftarbayar di setup_5parameter ==Jo 21-02-2017==
$slstatus="select kode from setup_5parameter where flag='statpyls' order by kode asc";
$resstatus=$eksi->sSQL($slstatus);
foreach($resstatus as $barstatus){
	$statpyls=$barstatus['kode'];
}



//untuk pilihan status
function getStatus($status,$eksi){
	$slstatus="select kode,nama from setup_5parameter where flag='stpostbyr' order by kode asc";
	$resstatus=$eksi->sSQL($slstatus);
	foreach($resstatus as $barstatus){
		if ($barstatus['kode']==$status){
			$slt='selected';
		}
		else{
			$slt='';
		}
		$optstatus.="<option value=".$barstatus['kode']." ".$slt.">".$_SESSION['lang'][$barstatus['nama']]."</option>";
	}
	return $optstatus;
}

$kosong='';



switch(true)
{
	case ($method=='showHeader'):	
		//untuk ambil kode transaksi invoice in
		$slcode="select kode from setup_5parameter where flag='tagihan'";
		$rescode=$eksi->sSQL($slcode);
		foreach($rescode as $barcode){
			$kodetr=$barcode['kode'];
		}

		$limit=10;
		$page=0;
		if(isset($_POST['page'])){
		$page=$_POST['page'];
		if($page<0)
		$page=0;
		}
		$offset=$page*$limit;	
		$filter = "";
		if(trim($_POST['filter'])!='' && trim($_POST['keyword'])!='') {
			if($_POST['filter']=='a.sumberdokumen'){
				$slsdok="select kode from setup_5parameter where flag='sumberdok' and nama like '%".trim($_POST['keyword'])."%' LIMIT 1";
				$ressdok=$eksi->sSQL($slsdok);
				foreach($ressdok as $barsdok){
					$kodepar=$barsdok['kode'];
				}
				$filter = "AND ".$_POST['filter']."=".$kodepar."";
			}
			else {
				$filter = "AND ".$_POST['filter']." LIKE '%".trim($_POST['keyword'])."%'";
			}
			
			//echo "warning: ".$filter;
		}
		if (trim($_POST['tglcari'])!=''){
			$filter.="AND a.tanggalinvterima='".$eksi->ymd($_POST['tglcari'])."'";
		}
		
		//untuk filter pusat atau tidak ==Jo 28-02-2017==
		//rubah filter ==Jo 19-05-2017==
		$loktug="";
		if ($_SESSION['empl']['pusat']==1){
			$loktug="and a.lokasitugas like '".$_SESSION['empl']['kodeorganisasi']."%'";
		}
		else {
			$loktug="and a.lokasitugas='".$_SESSION['empl']['lokasitugas']."'";
		}

		$str="select a.tanggalinvterima, a.noakunbank, a.statuspostingbayar, a.nocounter, b.namasupplier, a.noinvoice,a.sumberdokumen,a.nodokumen, a.keterangan, a.grandtotal,a.lastpayamt, a.rmnamt, a.nocekgiro, c.nama as namastatus, d.nama as smbdok,xx.atasnama,xx.norekening,yy.namabank
		from keu_trx_ht a left join log_5supplier b on a.custsupplier = b.supplierid
		left join setup_5parameter c on a.statuspostingbayar = c.kode and c.flag='stpostbyr'
		left join setup_5parameter d on a.sumberdokumen=d.kode and d.flag='sumberdok'
		left join log_banksupplier xx ON a.idbankcustsupplier=xx.idbanksupplier
		LEFT JOIN keu_5bank yy ON xx.kodebank=yy.noakun
		where a.trxtype=".$kodetr." and a.statusbayar=".$statpyls." ".$filter." ".$loktug."
		ORDER BY a.tanggalinvterima desc limit ".$offset.",".$limit." ";
		
		$sql=" select a.nocounter,a.tanggalinvterima,  a.noakunbank, a.statuspostingbayar, a.nocounter, b.namasupplier, a.noinvoice, a.keterangan, a.grandtotal,a.lastpayamt, a.rmnamt, a.nocekgiro, c.nama as namastatus, d.nama as smbdok,xx.atasnama,xx.norekening,yy.namabank
		from keu_trx_ht a left join log_5supplier b on a.custsupplier = b.supplierid
		left join setup_5parameter c on a.status = c.kode and c.flag='stpostbyr'
		left join setup_5parameter d on a.sumberdokumen=d.kode and d.flag='sumberdok'
		left join log_banksupplier xx ON a.idbankcustsupplier=xx.idbanksupplier
		LEFT JOIN keu_5bank yy ON xx.kodebank=yy.noakun
		where a.trxtype=".$kodetr." and a.statusbayar=".$statpyls." ".$filter." ".$loktug." 
		ORDER BY a.tanggalinvterima ";
		
		$res= $eksi->sSQL($str);
		$jlhbrs = 0;
		$no=($page*$limit);
		
		$jlhbrs= $eksi->sSQLnum($sql);
		
		foreach($res as $bar) {
			$no+=1;
			//cari status posting di setup_5parameter ==Jo 09-02-2017==
			$slstatus="select kode from setup_5parameter where flag='statuspost' order by kode asc";
			$resstatus=$eksi->sSQL($slstatus);
			foreach($resstatus as $barstatus){
				$statpost=$barstatus['kode'];
			}

			if ($bar['statuspostingbayar']==$statpost){
				$dis='disabled';
				//tambah untuk muncullkan tanggal entry pembayaran ==Jo 11-04-2017==
				$cektgl="select tanggalentry from keu_jurnalht where noreferensi='".$bar['nocounter']."'";
				$rescektgl=$eksi->sSQL($cektgl);
				foreach($rescektgl as $barcektgl){
					$tglentrys=$barcektgl['tanggalentry'];
				}
			}
			else {
				$dis='';
				$tglentrys='';
			}
			
			if($bar['sumberdokumen']==$dokln){
				$nodoks="-";
			}
			else if ($bar['sumberdokumen']==$dokbaspk){
				$slspk="select spk from log_spk_ba where id='".$bar['nodokumen']."'";
				$resspk=$eksi->sSQL($slspk);
				foreach($resspk as $barspk){
					$nospk=$barspk['spk'];
				}
				$nodoks=$nospk;
			}
			else {
				$nodoks=$bar['nodokumen'];
			}
			echo"<tr class=rowcontent>
				  <td>".$no."</td>
				  <td>".$bar['tanggalinvterima']."</td>
					  <td>".$bar['namasupplier']."</td>
					   <td><b>".$bar['namabank']."</b>".chr(13).chr(10)."\n a/n : ".$bar['atasnama'].chr(13).chr(10)."\n Rek : ".$bar['norekening']."</td>
					   <td>".$bar['noinvoice']."</td>
					  <td>".$bar['smbdok']."</td>
					  <td>".$nodoks."</td>
					  <td>".$bar['keterangan']."</td>
					  <td>".$bar['nocekgiro']."</td>
					   <td>".number_format($bar['grandtotal'],2,'.',',')."</td>
					    <td>".number_format($bar['lastpayamt'],2,'.',',')."</td>
					  <td>".number_format($bar['rmnamt'],2,'.',',')."</td>
					  <td> <input ".$dis." type=text id=tglbayar_".$no." class=myinputtext onmouseover=\"setCalendar(this);\" value='".$tglentrys."'></td>
					   <td align=right width=120 style='display:none;'><img src='images/puzz.png' style='cursor:pointer;' title='click to get value' onclick=\"document.getElementById('bayar_".$no."').value='".number_format($bar['rmnamt'],2,'.',',')."'\">
		                  <input ".$dis." type=text id=bayar_".$no." class=myinputtextnumber onkeypress=\"return angka_doang(event);\"  onblur=change_number(this) size=12 value='".number_format($bar['rmnamt'],2,'.',',')."'></td>
					 
					  <td ><select id=statustrans_".$no."  onchange=\"UpdateStatus('".$no."','".$bar['nocounter']."');\" ".$dis.">".getStatus($bar['statuspostingbayar'],$eksi)."</select></td>
					   
					   
					  <td>
					  <img src=images/pdf.jpg class=resicon  title='Print Tagihan' onclick=\"masterPDF('keu_trx_ht','".$bar['nocounter']."','','keu_slave_daftar_bayar_print',event);\">
					  <!--<img onclick=\"previewDetail('".$bar['nocounter']."','".$bar['noinvoice']."',event);\" title=\"Detail Tagihan\" class=\"resicon\" src=\"images/zoom.png\">-->
					  </td>
					  <input type=hidden id=invdt value='".$_SESSION['lang']['detailinvoicein']."'>
					 </tr>";
		}	

		echo "<tr class='footercolor'>
			<td colspan=12 align=center>
			".(($page*$limit)+1)." to ".(($page+1)*$limit)." Of ".  $jlhbrs."
			<br />
			<button class=mybutton onclick=cariList(".($page-1).");>".$_SESSION['lang']['pref']."</button>
			<button class=mybutton onclick=cariList(".($page+1).");>".$_SESSION['lang']['lanjut']."</button>
			<input type=hidden id=alhapus value='".$_SESSION['lang']['confirmdel']."'>
			</td>
			</tr>";	
	break;
	
	
	case ($method=='updateStatus'):
		$tglbayar=$_POST['tglbayar'];
		if ($status==$statpost){
			if($tglbayar==""){
				echo $_SESSION['lang']['tgbyrkosong'];
			}
			else {
				$sltrx="select custsupplier,sumberdokumen,nodokumen,kodematauang,matauangbayar,kurs,kursbayar,rmnamt,rmnamtidr as bayarnormal,rmnamt*kursbayar as bayaridr,coa,strxtype,noakunbank,noinvoice from keu_trx_ht where nocounter='".$nocounter."'";
				//echo "warning:".$sltrx;exit();
				
				$restrx=$eksi->sSQL($sltrx);
				foreach($restrx as $bartrx){
					postInv($bartrx['custsupplier'],$bartrx['sumberdokumen'],$bartrx['nodokumen'],$bartrx['kodematauang'],$bartrx['matauangbayar'],$bartrx['kurs'],$bartrx['kursbayar'],$bartrx['rmnamt'],$bartrx['bayarnormal'],$bartrx['bayaridr'],$bartrx['coa'],$bartrx['strxtype'],$eksi,$nocounter,$status,$dokcip,$dokspk,$dokbaspk,$dokpo,$dokln,$bartrx['noakunbank'],$bartrx['noinvoice'],$tglbayar);
				}
			}
			
			
		}
		else {
			$updates=array("statuspostingbayar"=>"".$status."",
						"updateby"=>"'".$_SESSION['standard']['userid']."'" );
		
			$string=$eksi->genSQL('keu_trx_ht',$updates,true)." 
			WHERE  nocounter='".$nocounter."'";
			
			
			//echo "warning: ".$string;
			$hasil=$eksi->exc($string);
			
			if(!$hasil){
				echo $_SESSION['lang']['simpangagal'];
			}else {

				echo $_SESSION['lang']['alertupdate'];
			}

		}
		
			
	break;
	
	
	
	default:
		break;
		

}
//posting invoice ke Jurnal
function postInv($custid,$smbdok,$nodok,$matauang,$matauangbayar,$kurs,$kursbayar,$rmnamt,$bayarnormal,$bayaridr,$coa,$strxtype,$eksi,$nocountertr,$status,$dokcip,$dokspk,$dokbaspk,$dokpo,$dokln,$noakunbank,$noinvoices,$tglbayar){
	
	//ambil no akun dari supplier 
	$slsp="select kodekelompok from log_5supplier where supplierid='".$custid."'";
	$ressp=$eksi->sSQL($slsp);
	foreach($ressp as $barsp){
		$kodeklp=$barsp['kodekelompok'];
	}
	$slspl="select advance,noakun,apaccrued from log_5klsupplier where kode='".$kodeklp."'";
	$resspl=$eksi->sSQL($slspl);
	foreach($resspl as $barspl){
		$wip=$barspl['advance'];
		$ap=$barspl['noakun'];
		$apaccrued=$barspl['apaccrued'];
	}
	$kodespl=$custid;
	//ambil no akun pajak ppn
	$slppn="select masukan,biaya from log_master_pajak where kode='".$kodeppn."'";
	$resppn=$eksi->sSQL($slppn);
	foreach($resppn as $barppn){
		$vatin=$barppn['masukan'];
	}
	//ambil no akun pajak pph
	$slppn="select masukan,biaya from log_master_pajak where kode='".$kodepph."'";
	$resppn=$eksi->sSQL($slppn);
	foreach($resppn as $barppn){
		$accpph=$barppn['biaya'];
	}
	
	//ambil akun selisih kurs ==Jo 27-03-2017==
	$slackurs="select nama from setup_5parameter where flag='noakun' and kode='slkurs'";
	$resackurs=$eksi->sSQL($slackurs);
	foreach($resackurs as $barackurs){
		$accselisih=$barackurs['nama'];
	}
	
	//ambil mata uang yang merupakan default ==Jo 27-03-2017==
	$slmtuang="select kode from setup_matauang where `default`=1";
	$resmtuang=$eksi->sSQL($slmtuang);
	foreach($resmtuang as $barmtuang){
		$mtuangdf=$barmtuang['kode'];
	}
	
	$debet=Array();
	$ndebet=Array();
	$kredit=Array();
	$nkredit=Array();
	//echo "warning: ".$bayarnormal." ".$bayaridr;exit();	
	//echo "warning: ".$kurs." ".$kursbayar;exit();
	//tambah kondisi untuk selisih jika kurs asing ==Jo 26-03-2017==
	if($kurs==$kursbayar){
		$debet[0]=$ap;
		$kredit[0]=$noakunbank;
		$ndebet[0]=$bayaridr;
		$nkredit[0]=$bayaridr;
	}
	else {
		if($kursbayar>$kurs){
			$debet[0]=$ap;
			$debet[1]=$accselisih;
			$kredit[0]=$noakunbank;
			
			$ndebet[0]=$bayarnormal;
			$ndebet[1]=$bayaridr-$bayarnormal;
			$nkredit[0]=$bayaridr;
			
		}
		else if($kursbayar<$kurs) {
			$debet[0]=$ap;
			$kredit[0]=$noakunbank;
			$kredit[1]=$accselisih;
			$ndebet[0]=$bayarnormal;
			$nkredit[0]=$bayaridr;
			$nkredit[1]=$bayarnormal-$bayaridr;
		}
	}
	
	//rubah prefix untuk pembayaran invoice  ==Jo 09-05-2017===
	//kode,nocounter jurnal
	$kodejurnal='';
	$slkdjr="select prefix,nokounter from keu_5strx where kodeinduk=600 and kode=100";
	$reskdjr=$eksi->sSQL($slkdjr);
	foreach($reskdjr as $barkdjr){
		$kodejurnal=$barkdjr['prefix'];
		$counters=$barkdjr['nokounter'];
	}
	//tidak jadi ambil dari keu_5kelompokjurnal
	/*$counters=0;
	$slcounter="select nokounter from keu_5kelompokjurnal where kodekelompok='".$kodejurnal."'";
	$rescounter=$eksi->sSQL($slcounter);
	foreach($rescounter as $barcounter){
		$counters=$barcounter['nokounter'];
	}*/
	$slncg="select a.nocekgiro,b.namasupplier from keu_trx_ht a
	left join log_5supplier b on a.custsupplier=b.supplierid
	where a.nocounter='".$nocountertr."'";
	$resncg=$eksi->sSQL($slncg);
	foreach($resncg as $barncg){
		$nocekgiro=$barncg['nocekgiro'];
		$namaspl=$barncg['namasupplier'];
	}
	
	
	//$ketjurnals=$_SESSION['lang']['pembayaran']." / ".$noinvoices." / ".$nocekgiro;
	//rubah format ==Jo 08-05-2017==
	$ketjurnals=$namaspl.chr(13).chr(10).$_SESSION['lang']['pembayaran'].chr(13).chr(10).$noinvoices.chr(13).chr(10).$nocekgiro;
	//$ketjurnals.=$keterangans;
	$nocounter=intval($counters)+1;
	
	if ($nocounter<10){
		$nocounters='00'.(string)$nocounter;
	}
	else if($nocounter<100){
		$nocounters='0'.(string)$nocounter;
	}
	else{
		$nocounters=(string)$nocounter;
	}
	
	$nojurnal=str_replace("-","",date('Y-m-d'))."/".$_SESSION['empl']['lokasitugas']."/".$kodejurnal."/".$nocounters;
	$sldok="select nama from  setup_5parameter where kode='".$smbdok."'";
	$resdok=$eksi->sSQL($sldok);
	foreach($resdok as $bardok){
		$namadok=$bardok['nama'];
	}
	
	$lokasitugas="";
	$ssql="SELECT lokasitugas FROM keu_trx_ht WHERE nocounter='".$nocountertr."' LIMIT 1";
	$rsx=$eksi->ssql($ssql);
	foreach($rsx as $rx){
		$lokasitugas=$rx['lokasitugas'];//untuk simpan lokkasitugas pembuat di jurnal ==Jo 07-06-2017==
	}

	//$ketjurnal="Posting ".$_SESSION['lang']['pembayaran']." ".$namadok."/".$keterangans;
	//posting ke jurnal
	//header jurnal
	$header=array("nojurnal"=>"'".$nojurnal."'",
				  "kodejurnal"=>"'".$kodejurnal."'",
				  "tanggal"=>"'".$eksi->ymd($tglbayar)."'",
				  "tanggalentry"=>"'".date('Ymd')."'",
				  "posting"=>"0",
				  "totaldebet"=>"".$bayaridr."",
				  "totalkredit"=>"".-1*$bayaridr."",
				  "amountkoreksi"=>"0",
				  "noreferensi"=>"'".$nocountertr."'",
				  "autojurnal"=>"1",
				  "matauang"=>"'".$mtuangdf."'",
				  "kurs"=>"'".$kurs."'",
				  "revisi"=>"0");
	$stringhd=$eksi->genSQL('keu_jurnalht',$header,false);
	//echo "warning: ".$stringhd;exit();
	$postHeader=$eksi->exc($stringhd);
	if($postHeader){
		//detail jurnal (debet dan kredit)
		//debet
		$nourut=1;
		//variabel untuk hitung posting debet dan kredit yang berhasil ==Jo 09-05-2017==
		$pdb=0;
		$pkr=0;
		for($i=0;$i<count($debet);$i++){
			if($ndebet[$i]>0){
				$insdebet=array("nojurnal"=>"'".$nojurnal."'",
					  "tanggal"=>"'".date('Ymd')."'",
					  "nourut"=>"".$nourut."",
					  "noakun"=>"'".$debet[$i]."'",
					  "keterangan"=>"'".$ketjurnals."'",
					  "jumlah"=>"".$ndebet[$i]."",
					  "matauang"=>"'".$mtuangdf."'",
					  "kurs"=>"".$kursbayar."",
					  "kodeorg"=>"'".$lokasitugas."'",
					  "kodekegiatan"=>"''",
					  "kodeasset"=>"''",
					  "kodebarang"=>"''",
					  "nik"=>"'".$_SESSION['standard']['userid']."'",
					  "kodecustomer"=>"'".$custid."'",
					  "kodesupplier"=>"'".$kodespl."'",
					  "noreferensi"=>"'".$nocountertr."'",
					  "noaruskas"=>"''",
					  "kodevhc"=>"''",
					  "nodok"=>"'".$nodok."'",
					  "kodeblok"=>"'"-"'",
					  "revisi"=>"0");
				$stringdebet=$eksi->genSQL('keu_jurnaldt',$insdebet,false);
				//echo "warning: ".$stringdebet;
				$qdebet=$eksi->exc($stringdebet);
				if($qdebet){
					$pdb++;
					$nourut++;
				}
			}
		}
		//kredit
		for($i=0;$i<count($kredit);$i++){
			if($nkredit[$i]>0){
				$inskredit=array("nojurnal"=>"'".$nojurnal."'",
					  "tanggal"=>"'".date('Ymd')."'",
					  "nourut"=>"'".$nourut."'",
					  "noakun"=>"'".$kredit[$i]."'",
					  "keterangan"=>"'".$ketjurnals."'",
					  "jumlah"=>"".-1*$nkredit[$i]."",
					  "matauang"=>"'".$mtuangdf."'",
					  "kurs"=>"".$kursbayar."",
					  "kodeorg"=>"'".$lokasitugas."'",
					  "kodekegiatan"=>"''",
					  "kodeasset"=>"''",
					  "kodebarang"=>"''",
					  "nik"=>"'".$_SESSION['standard']['userid']."'",
					  "kodecustomer"=>"'".$custid."'",
					  "kodesupplier"=>"'".$kodespl."'",
					  "noreferensi"=>"'".$nocountertr."'",
					  "noaruskas"=>"''",
					  "kodevhc"=>"''",
					  "nodok"=>"'".$nodok."'",
					  "kodeblok"=>"''",
					  "revisi"=>"0");
				$stringkredit=$eksi->genSQL('keu_jurnaldt',$inskredit,false);
			}
			$qkredit=$eksi->exc($stringkredit);
			if($qkredit){
				$pkr++;
				$nourut++;
				
			}
			
		}
		//echo "warning: ".count($debet)." ".$pdb." ".count($kredit)." ".$pkr;
		//rubah kondisi update status posting transaksi posting ==Jo 09-05-2017==
		if(count($debet)==$pdb || count($kredit)==$pkr){
			$updates=array("lastpayamt"=>"".$bayaridr."",
					"lastpayamtidr"=>"".$bayarnormal."",
					"updateby"=>"'".$_SESSION['standard']['userid']."'" );
	
				$string=$eksi->genSQL('keu_trx_ht',$updates,true)." 
				WHERE  nocounter='".$nocountertr."'";
				
				
			//echo "warning: ".$string;
			$hasil=$eksi->exc($string);
			
			if(!$hasil){
				echo $_SESSION['lang']['simpangagal'];
			}else {
				$upcounter=array("nokounter"=>"".$nocounters."");

				$stcounter=$eksi->genSQL('keu_5strx',$upcounter,true)." 
				WHERE prefix='".$kodejurnal."' and kodeinduk=600 and kode=100";
				//echo "warning: ".$stcounter;
				$hasilct=$eksi->exc($stcounter);
				if($hasilct){
					$upall=$eksi->exc("call sp_keutrxht('INVOICE','".$nocountertr."')");
					//echo "call sp_keutrxht('INVOICE','".$nocountertr."')";
					if($upall){
						$slrmn="select rmnamt from keu_trx_ht where nocounter='".$nocountertr."'";
						$resrmn=$eksi->sSQL($slrmn);
						foreach($resrmn as $barrmn){
							$sisaak=$barrmn['rmnamt'];
						}
						
						
						//untuk bayar parsial, kembalikan isian di daftar pembayaran menjadi default ==Jo 12-05-2017==
						if($sisaak>0){
							$updates=array("matauangbayar"=>"''",
							"kursbayar"=>"1",
							"nocekgiro"=>"NULL",
							"tipepembayaran"=>"NULL",
							"noakunbank"=>"NULL",
							"idbankcustsupplier"=>"0",
							"updateby"=>"'".$_SESSION['standard']['userid']."'");

							$string=$eksi->genSQL('keu_trx_ht',$updates,true)." 
							WHERE  nocounter='".$nocountertr."'";
							
							
							$hasil=$eksi->exc($string);
							if($hasil){
								echo $_SESSION['lang']['dataposted'];
							}
							else{
								echo $_SESSION['lang']['simpangagal'];
							}
						}
						else{
							echo $_SESSION['lang']['dataposted'];
						}
						
					}
					else {
						echo $_SESSION['lang']['simpangagal'];
					}
					
				}
				else {
					echo $_SESSION['lang']['simpangagal'];
				}
			}
		}
	}
	else {
		echo $_SESSION['lang']['simpangagal'];
	}
}

?>