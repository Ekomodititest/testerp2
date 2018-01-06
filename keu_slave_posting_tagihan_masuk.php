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
$slln="select kode from  setup_5parameter where flag='dokln'";
$resln=$eksi->sSQL($slln);
foreach($resln as $barln){
	$dokln=$barln['kode'];
}

//ambil kode pib po
$slpibpo="select kode from  setup_5parameter where flag='dokpibpo'";
$respibpo=$eksi->sSQL($slpibpo);
foreach($respibpo as $barpibpo){
	$dokpibpo=$barpibpo['kode'];
}

//cari status posting di setup_5parameter ==Jo 09-02-2017==
$slstatus="select kode from setup_5parameter where flag='statuspost' order by kode asc";
$resstatus=$eksi->sSQL($slstatus);
foreach($resstatus as $barstatus){
	$statpost=$barstatus['kode'];
}

//cari status pajak jika masukan ==Jo 22-03-2017==
$slpj1="select nama from setup_5parameter where kode='PPV1'";
$respj1=$eksi->sSQL($slpj1);
foreach($respj1 as $barpj1){
	$pjmasukan=$barpj1['nama'];
}

//cari status pajak jika biaya ==Jo 22-03-2017==
$slpj2="select nama from setup_5parameter where kode='PPV2'";
$respj2=$eksi->sSQL($slpj2);
foreach($respj2 as $barpj2){
	$pjbiaya=$barpj2['nama'];
}


//untuk pilihan status
function getStatus($status,$eksi){
	$slstatus="select kode,nama from setup_5parameter where flag='statuskeu' order by kode asc";
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
		if(trim($_POST['filter'])!='' && (trim($_POST['keyword'])!='' || trim($_POST['filterstat'])!='')) {
			if($_POST['filter']=='a.sumberdokumen'){
				$slsdok="select kode from setup_5parameter where flag='sumberdok' and nama like '%".trim($_POST['keyword'])."%' LIMIT 1";
				$ressdok=$eksi->sSQL($slsdok);
				foreach($ressdok as $barsdok){
					$kodepar=$barsdok['kode'];
				}
				$filter = "AND ".$_POST['filter']."=".$kodepar."";
			}
			else if($_POST['filter']=='a.status'){
				if($_POST['filterstat']!=''){
					$filter = "AND ".$_POST['filter']." = '".trim($_POST['filterstat'])."'";
					
				}
				else { 
					$filter = "";
				}
				
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
		$str="select a.tanggalinvterima, a.status, a.nocounter, b.namasupplier, a.noinvoice,a.sumberdokumen,a.nodokumen, a.keterangan, a.grandtotal, c.nama as namastatus, d.nama as smbdok,a.coa,e.noakun from keu_trx_ht a 
		left join log_5supplier b on a.custsupplier = b.supplierid
		left join setup_5parameter c on a.status = c.kode and c.flag='statuskeu'
		left join setup_5parameter d on a.sumberdokumen=d.kode and d.flag='sumberdok'
		left join setup_kegiatan e on a.coa=e.kodekegiatan
		where a.trxtype=".$kodetr." ".$filter." ".$loktug."
		ORDER BY a.tanggalinvterima desc limit ".$offset.",".$limit." ";
		
		$sql=" select a.nocounter,a.tanggalinvterima, a.status, a.nocounter, b.namasupplier, a.noinvoice, a.keterangan, a.grandtotal, c.nama as namastatus, d.nama as smbdok, a.coa,e.noakun from keu_trx_ht a 
		left join log_5supplier b on a.custsupplier = b.supplierid
		left join setup_5parameter c on a.status = c.kode and c.flag='statuskeu'
		left join setup_5parameter d on a.sumberdokumen=d.kode and d.flag='sumberdok'
		left join setup_kegiatan e on a.coa=e.kodekegiatan
		where a.trxtype=".$kodetr." ".$filter." ".$loktug." ORDER BY a.tanggalinvterima ";
		
		//echo "warning: ".$sql;
		
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

			if ($bar['status']==$statpost){
				$dis='disabled';
			}
			else {
				$dis='';
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
			
			$noackgs="-";
			//untuk noakun/kegiatan ==Jo 09-05-2017==
			$noackg=$bar['noakun']."/".$bar['coa'];
			if($noackg=='/'){
				$noackgs="-";
			}
			else{
				$noackgs=$noackg;
			}
			echo"<tr class=rowcontent>
				  <td>".$no."</td>
				  <td>".$bar['tanggalinvterima']."</td>
					  <td>".$bar['namasupplier']."</td>
					  <td>".$bar['noinvoice']."</td>
					  <td>".$bar['smbdok']."</td>
					  <td>".$nodoks."</td>
					  <td>".$bar['keterangan']."</td>
					  <td>".$noackgs."</td>
					  <td>".number_format($bar['grandtotal'],2,'.',',')."</td>
					  <td ><select id=statustrans_".$no."  onchange=\"UpdateStatus('".$no."','".$bar['nocounter']."');\" ".$dis.">".getStatus($bar['status'],$eksi)."</select></td>
					  <td>
					  <img src=images/pdf.jpg class=resicon  title='Print Tagihan' onclick=\"masterPDF('keu_trx_ht','".$bar['nocounter']."','','keu_slave_tagihan_new_print',event);\">
					  <!--<img onclick=\"previewDetail('".$bar['nocounter']."','".$bar['noinvoice']."',event);\" title=\"Detail Tagihan\" class=\"resicon\" src=\"images/zoom.png\"> -->
					  </td>
					  <input type=hidden id=invdt value='".$_SESSION['lang']['detailinvoicein']."'>
					 </tr>";
		}	

		echo "<tr class='footercolor'>
			<td colspan=10 align=center>
			".(($page*$limit)+1)." to ".(($page+1)*$limit)." Of ".  $jlhbrs."
			<br />
			<button class=mybutton onclick=cariList(".($page-1).");>".$_SESSION['lang']['pref']."</button>
			<button class=mybutton onclick=cariList(".($page+1).");>".$_SESSION['lang']['lanjut']."</button>
			<input type=hidden id=alhapus value='".$_SESSION['lang']['confirmdel']."'>
			</td>
			</tr>";	
	break;
	
	
	case ($method=='updateStatus'):

		if ($status==$statpost){
			$sltrx="select custsupplier,sumberdokumen,nodokumen,kodematauang,kurs,kurs*((diskon/100)*total) as discount,kurs*selisih as selisih,kodeppn,kurs*nilaippn as nilaippn,kodepph,kurs*nilaipph as nilaipph,kurs*nilaipbbkb as nilaipbbkb,kurs*nett as nett,kurs*grandtotal as grandtotal1,coa,strxtype,keterangan from keu_trx_ht where nocounter='".$nocounter."' LIMIT 1";
			$restrx=$eksi->sSQL($sltrx);
			foreach($restrx as $bartrx){
				postInv($bartrx['custsupplier'],$bartrx['sumberdokumen'],$bartrx['nodokumen'],$bartrx['kodematauang'],$bartrx['kurs'],$bartrx['discount'],$bartrx['selisih'],$bartrx['kodeppn'],$bartrx['nilaippn'],$bartrx['kodepph'],$bartrx['nilaipph'],$bartrx['nilaipbbkb'],$bartrx['nett'],$bartrx['grandtotal1'],$bartrx['coa'],$bartrx['strxtype'],$eksi,$nocounter,$status,$dokcip,$dokspk,$dokbaspk,$dokpo,$dokln,$dokpibpo,$bartrx['keterangan']);
			}
		}
		else {
			$updates=array("status"=>"".$status."",
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
function postInv($custid,$smbdok,$nodok,$matauang,$kurs,$discount,$selisih,$kodeppn,$ppns,$kodepph,$pphs,$pbbkbs,$nett,$grandtotal,$coa,$strxtype,$eksi,$nocountertr,$status,$dokcip,$dokspk,$dokbaspk,$dokpo,$dokln,$dokpibpo,$keterangans){
	
	$noinvoice="";
	$lokasitugas="";
	$ssql="SELECT noinvoice,lokasitugas FROM keu_trx_ht WHERE nocounter='".$nocountertr."' LIMIT 1";
	$rsx=$eksi->ssql($ssql);
	foreach($rsx as $rx){
		$noinvoice=$rx['noinvoice'];
		$lokasitugas=$rx['lokasitugas'];//untuk simpan lokkasitugas pembuat di jurnal ==Jo 07-06-2017==
	}
	//ambil no akun dari supplier, tambah ambil nama supplier ==Jo 08-05-2017==
	$slsp="select kodekelompok,namasupplier from log_5supplier where supplierid='".$custid."' LIMIT 1";
	$ressp=$eksi->sSQL($slsp);
	foreach($ressp as $barsp){
		$kodeklp=$barsp['kodekelompok'];
		$namaspl=$barsp['namasupplier'];
	}
	$slspl="select advance,noakun,apaccrued from log_5klsupplier where kode='".$kodeklp."' LIMIT 1";
	$resspl=$eksi->sSQL($slspl);
	foreach($resspl as $barspl){
		$wip=$barspl['advance'];
		$ap=$barspl['noakun'];
		$apaccrued=$barspl['apaccrued'];
	}
	
	//no akun khusus BA SPK jika SPK  Kecil
	$sltipe="select b.tipe,b.act from log_spk_ba a left join log_spkht_new b on a.spk=b.nospk where a.id='".$nodok."' LIMIT 1";
	$restipe=$eksi->sSQL($sltipe);
	foreach($restipe as $bartipe){
		$tipespk=$bartipe['tipe'];
		$akunspk=$bartipe['act'];
	}
	if($smbdok==$dokbaspk && $tipespk==0){
		$wip=$akunspk;
	}
	
	$kodespl=$custid;
	
	//ambil jenis akun ppn po 
	if($smbdok==$dokpo){
		$slacpp="select jenis_perlakuan from log_poht where nopo='".$nodok."' LIMIT 1";
		$resacpp=$eksi->sSQL($slacpp);
		foreach($resacpp as $baracpp){
			$jenisppn=$baracpp['jenis_perlakuan'];
		}
	}
	
	//ambil no akun pajak ppn
	$slppn="select masukan,biaya,rate from log_master_pajak where kode='".$kodeppn."' LIMIT 1";
	$resppn=$eksi->sSQL($slppn);
	foreach($resppn as $barppn){
		//tambah kondisi untuk  akun pajak masukan dan biaya ==Jo 22-03-2017==
		if($smbdok!=$dokpo || ($smbdok==$dokpo && $jenisppn==$pjmasukan)){
			$vatin=$barppn['masukan'];
		}
		else if($smbdok==$dokpo && $jenisppn==$pjbiaya){
			$vatin=$barppn['biaya'];
		}
		
		$persenppn=$barppn['rate'];
	}
	//ambil no akun pajak pph
	$slppn="select masukan,biaya,rate from log_master_pajak where kode='".$kodepph."' LIMIT 1";
	$resppn=$eksi->sSQL($slppn);
	foreach($resppn as $barppn){
		$accpph=$barppn['biaya'];
		$persenpph=$barppn['rate'];
	}
	
	//ambil akun diskon/selisih beban pajak/netoff(jika nett off tidak dijurnal)/pib
	$akundsc='';
	$sldiskon="select ifnull(noakun,'') as noakun from setup_kegiatan where kodekegiatan='".$coa."' LIMIT 1";
	$resdiskon=$eksi->sSQL($sldiskon);
	foreach($resdiskon as $bardiskon){
		$akundsc=$bardiskon['noakun'];
	}
	$debet=Array();
	$ndebet=Array();
	$kredit=Array();
	$nkredit=Array();
	
	//untuk PO
	if ($smbdok==$dokpo){
		$grandtotals=$grandtotal;
		//Cari total Pembayaran
		$ssql="SELECT sum(nett)*kurs as nilai,noinvoice,sum(subtotal+nilaipph)*kurs as nilaitax FROM keu_trx_ht WHERE `status`=3 AND nodokumen='".$nodok."' LIMIT 1";
		$totalinvoice=0;
		$totalinvoicetax=0;
		$rs=$eksi->ssql($ssql);
		foreach($rs as $r){
			$totalinvoice=$r['nilai'];
			$totalinvoicetax=$r['nilaitax'];
		}
		//Cari total GRN
		$ssql="select sum(a.jumlah*a.hargasatuan*c.kurs) as totalgrn,round(((1+(c.ppn/100))*sum(a.jumlah*a.hargasatuan*c.kurs)),2) as totalgrntax 
				from log_transaksidt a, log_transaksiht b, log_poht c
				WHERE a.notransaksi=b.notransaksi
				AND b.nopo=c.nopo
				AND b.statusjurnal=1 AND tipetransaksi=1
				AND b.nopo='".$nodok."'";
		$totalgrn=0;
		$totalgrntax=0;
		$rs=$eksi->ssql($ssql);
		foreach($rs as $r1){
			$totalgrn=$r1['totalgrn'];
			//$totalgrntax=$r1['totalgrntax'];
			$totalgrntax=$r1['totalgrntax'];
		}
		//Cari total PPN GRN
		$ssql="select c.ppnnilai*c.kurs as ppnnilai from log_transaksiht b,  log_poht c
				WHERE  b.nopo=c.nopo
				AND b.statusjurnal=1 AND tipetransaksi=1
				AND b.nopo='".$nodok."'";
		$ppnnilaigrn=0;
		$rs=$eksi->ssql($ssql);
		foreach($rs as $r1){
			$ppnnilaigrn=$r1['ppnnilai'];
		}
		
		//cek default perlakuan pajak
		$ssql="select nama from setup_5parameter WHERE flag='defaultppv' LIMIT 1";
		$defaultVAT="";
		$rs=$eksi->ssql($ssql);
		foreach($rs as $r2){
			$defaultVAT=$r2['nama'];
		}
		if (trim($defaultVAT)==""){
			echo "Warning : Please Contact IT to Set VAT Default at Setup Parameter.";
			exit;
		}
		
		//Cek barang bbm
		$kelompokBarang = "";
		$isbbm			= 0;
		$akunBarang 	= "";
		$strNoAkunBarang="SELECT a.kelompokbarang, a.isbbm, b.noakun FROM log_5masterbarang a 
						  INNER JOIN log_5klbarang b ON a.kelompokbarang = b.kode 
						  INNER JOIN log_podt c ON c.kodebarang=a.kodebarang
						  WHERE c.nopo='".$nodok."' AND  a.isbbm=1 LIMIT 1";
		$resNoAkunBarang=$eksi->sSQL($strNoAkunBarang);
		foreach($resNoAkunBarang as $rows){
			$kelompokBarang = $rows['kelompokbarang'];
			$isbbm 			= 1;
			$akunBarang		= $rows['noakun'];
		} 	

		//cari COA
		$ssql="select a.nopo,b.namasupplier,c.apaccrued,c.advance,c.noakun,ifnull(a.jenis_perlakuan,0) as jenis_perlakuan,
			IFNULL((select x.masukan from log_master_pajak x where x.tipe='VAT' AND x.rate=a.ppn LIMIT 1 ),'') as akunmasukan,
			IFNULL((select x.biaya from log_master_pajak x where x.tipe='VAT' AND x.rate=a.ppn LIMIT 1 ),'') as akunbiaya,
			IFNULL((select x.masukan from log_master_pajak x where x.tipe='VAT' AND x.rate=a.pph LIMIT 1 ),'') as akunpphmasukan,
			IFNULL((select x.biaya from log_master_pajak x where x.tipe='VAT' AND x.rate=a.pph LIMIT 1 ),'') as akunpphbiaya								
			from log_poht a,log_5supplier b,log_5klsupplier c
			WHERE a.nopo='".$nodok."' AND a.kodesupplier=b.supplierid AND c.kode=b.kodekelompok LIMIT 1";
		$COAAp="";
		$COAApAcc="";
		$COADp="";
		$COAPpnMasukan="";
		$COAPpnBiaya="";
		$COAPphMasukan="";
		$COAPphBiaya="";
		$VATRule="";
		$rs=$eksi->ssql($ssql);
		foreach($rs as $r3){
			$COAAp=$r3['noakun'];
			$COAApAcc=$r3['apaccrued'];
			$COADp=$r3['advance'];
			$COAPpnMasukan=$r3['akunmasukan'];
			$COAPpnBiaya=$r3['akunbiaya'];
			$COAPphMasukan=$r3['akunpphmasukan'];
			$COAPphBiaya=$r3['akunpphbiaya'];
			IF (trim($r3['jenis_perlakuan'])!=''){
				$VATRule=$r3['jenis_perlakuan'];
			}
		}
		if($VATRule=="0" || intval($VATRule)==0){$VATRule="";}
		
		$pesan="";
		if ($COAAp==""){			
			$pesan.="Please Contact IT to Set Account Number at Supplier Group.\n";
		}
		if ($COAApAcc==""){			
			$pesan.="Please Contact IT to Set Accrued Account Number at Supplier Group.\n";
		}
		if ($COADp==""){			
			$pesan.="Please Contact IT to Set Advance Account Number at Supplier Group.\n";
		}
		if ($VATRule!=""){
			if ($COAPpnMasukan==""){			
				$pesan.="Please Contact IT to Set Account Number at VAT Master.\n";
			}
			if ($COAPpnBiaya==""){			
				$pesan.="Please Contact IT to Set Advance Account Number at  VAT Master.\n";
			}
		}
		if (trim($pesan)!=""){
			echo $pesan;
			exit;
		}

		// Cari nilai
		$ssql="SELECT (diskon*kurs) as persenDisc,round((diskon*kurs/100)*(total*kurs),2) as nilaiDisc,(penambah*kurs) as penambah,(pengurang*kurs) as pengurang,
			   ((nett*kurs*100)/(100-persenpph))as dppGUpph,(nett*kurs) as dppmurni,
			   (grandtotal*kurs) as grandtotal1,(nilaippn*kurs) as nilaippn, (nilaipph*kurs) as nilaipph
			   FROM keu_trx_ht WHERE nocounter='".$nocountertr."' LIMIT 1";
		$persenDisc=0;
		$nilaiDisc=0;
		$penambah=0;
		$pengurang=0;
		$dppGUpph=0;
		$dppmurni=0;
		$grandtotal=0;
		$nilaippn=0;
		$nilaipph=0;
		$rs=$eksi->ssql($ssql);
		foreach($rs as $r4){
			$persenDisc=$r4['persenDisc'];
			$nilaiDisc=$r4['nilaiDisc'];
			$penambah=$r4['penambah'];
			$pengurang=$r4['pengurang'];
			$dppGUpph=$r4['dppGUpph'];
			$dppmurni=$r4['dppmurni'];
			$grandtotal=$r4['grandtotal1'];
			$nilaippn=$r4['nilaippn'];
			$nilaipph=$r4['nilaipph'];
		}
		
		$grandtotal=$dppmurni+$nilaippn-$nilaipph-$nilaiDisc;
		$grandtotals=$grandtotal;
		
		if ($isbbm==1){
			$dppmurni=$grandtotal;			
			$nilaipph=0;
			$nilaippn=0;
			$VATRule="";
		}
		//if (trim($VATRule)==""){
				$totalgrn=$totalgrntax;
				$totalinvoice=$totalinvoicetax;
		//}
		
				$DP=0;
				$ApAcc=0;
				$DP=$totalinvoice-$totalgrn;
				// cek ada sisa Pembayaran sebelumnya jika masih ada maka buat jurnal Dp AP
				if ($DP>0){
					if (trim($VATRule)!="" ){
						$DP=$dppmurni;
					}else{
						$DP=$dppmurni+$nilaippn;
					}
					$ApAcc=0;
				}
				
				if ($totalgrn==0 && $totalinvoice==0){
					if (trim($VATRule)!=""){
						$DP=$dppmurni;
					}else{
						$DP=$grandtotal;
					}
					$ApAcc=0;
				}
				
				/*	
					jika grn>invoice 1 dan sekarang dpmurni/Invoice2
					AppAcc=total grn - Invoice 1
					Dp = invoice 2 -(total grn - Invoice 1)
							Ap
							
					jika Grn<invoice dan sekrang invoice 2
					DP 1=
				*/
				$ApAcc=$totalgrn-$totalinvoice;					
				// cek ada sisa GRN sebelumnya jika masih ada maka ambil nilai AppAcc			
				
				if ($ApAcc>0){
					$DP=0;
					if (trim($VATRule)!=""){
						if ($dppmurni>=$ApAcc){
							$DP=$dppmurni-$ApAcc;
						}else{
							$ApAcc=$dppmurni;
						}						
					}else{
						if ($grandtotal>$ApAcc ){
							$DP=$grandtotal-$ApAcc;
						}else{
							$ApAcc=$grandtotal;
						}
					}				
				}
				
					
					if ($DP>0){
						array_push($debet,$COADp);
						array_push($ndebet,$DP);
					}
				
					if ($ApAcc>0){
						array_push($debet,$COAApAcc);
						array_push($ndebet,$ApAcc);
					}
					//Cek Pajak dibiayakan
					//PPN
					if (trim($VATRule)!=""){
						if (trim($defaultVAT)==trim($VATRule)){ //dibiayakan
							array_push($debet,$COAPpnBiaya);
							array_push($ndebet,$nilaippn);				
						}else{//di kredit kan
							array_push($debet,$COAPpnMasukan);
							array_push($ndebet,$nilaippn);		
						}
					}
					//PPH
					if($nilaipph>0){
						array_push($kredit,$COAPphMasukan);
						array_push($nkredit,$nilaipph);
					}
					//Discount
					if($nilaiDisc>0){
						array_push($kredit,$akundsc);
						array_push($nkredit,$nilaiDisc);
						//$kredit[1]=$akundsc;//tolong diganti kalo sudah ada masternya
					}
					//Dpp
					if($dppmurni>0){						
						array_push($kredit,$COAAp);
						array_push($nkredit,$dppmurni+$nilaippn-$nilaipph-$nilaiDisc);
						//$kredit[2]=$COAAp;
						//$nkredit[2]=$dppmurni+$nilaippn-$nilaipph-$nilaiDisc;
					}
		
		
		
	} //======================================End PO
	//untuk pib atas po
	else if ($smbdok==$dokpibpo){
		$grandtotals=$grandtotal;
		/*
		$debet[0]=$akundsc;
		$kredit[0]=$ap;
		$ndebet[0]=$grandtotals;
		$nkredit[0]=$grandtotals;
		*/
		array_push($debet,$akundsc);
		array_push($kredit,$ap);
		array_push($ndebet,$grandtotal);
		array_push($nkredit,$grandtotal);
	}
	
	//untuk Lain2 atau BASPK
	else if ($smbdok==$dokln || $smbdok==$dokbaspk){
		$grandtotals=$grandtotal;
		if($smbdok==$dokln){
			$acdebet=$nodok;
		}
		else if ($smbdok==$dokbaspk){
			$acdebet=$apaccrued;
		}
		
		/*$debet[0]=$acdebet;
		$kredit[0]=$ap;
		$ndebet[0]=$grandtotal;
		
		$nkredit[0]=$grandtotal;
		$nkredit[0]=$grandtotal-$discount;
		$nkredit[1]=$discount;
		
		if ($selisih>0){//nilai selisih positif
			$debet[1]=$akundsc;
			$ndebet[0]=$grandtotal-$selisih;
			$nkredit[0]=$grandtotal;
			$ndebet[1]=$selisih;
		}
		else if ($selisih<0) {//nilai selisih negatif
			$kredit[1]=$akundsc;
			$ndebet[0]=$grandtotal;
			$nkredit[0]=$grandtotal-$selisih;
			$nkredit[1]=$selisih;
		}*/
		//rubah jadi array_push ==Jo 04-05-2017==
		array_push($debet,$acdebet);
		array_push($kredit,$ap);
		array_push($ndebet,$grandtotal);
		
		if($discount!=0 && $akundsc!='-' && $akundsc!=''){
			array_push($kredit,$akundsc);
			array_push($nkredit,$grandtotal-$discount);
			array_push($nkredit,$discount);
		}
		else if($discount==0 && $selisih!=0 && $akundsc!='-' && $akundsc!=''){
			if ($selisih>0){//nilai selisih positif
				array_push($debet,$akundsc);
				array_push($ndebet,$grandtotal-$selisih);
				array_push($nkredit,$grandtotal);
				array_push($ndebet,$selisih);
			}
			else if ($selisih<0) {//nilai selisih negatif
				array_push($kredit,$akundsc);
				array_push($ndebet,$grandtotal);
				array_push($nkredit,$grandtotal-$selisih);
				array_push($nkredit,$selisih);
				
			}
		}
		else{
			array_push($nkredit,$grandtotal);
		}
		
		if($pphs!=0){
			$z=$ndebet[0]+$pphs;
			$ndebet[0]=$z;
			array_push($kredit,$accpph);
			array_push($nkredit,$pphs);
		}
		
		
		
		/*		
		if($ppns==0&&$pphs==0){//tanpa ppn dan pph 	
				
			if 	(($discount!=0 && ($akundsc=='-' || $akundsc=='')) ||($selisih!=0 && ($akundsc=='-' || $akundsc=='')) || ($discount!=0 && $akundsc=='-') || ($discount==0 && $selisih==0 &&  ($akundsc=='-' || $akundsc==''))){
				$debet[0]=$acdebet;
				$kredit[0]=$ap;
				$ndebet[0]=$grandtotal;
				$nkredit[0]=$grandtotal;
			}
			else if ($discount!=0 && $akundsc!='-' && $akundsc!=''){
				$debet[0]=$acdebet;
				$kredit[0]=$ap;
				$kredit[1]=$akundsc;
				$ndebet[0]=$grandtotal;
				$nkredit[0]=$grandtotal-$discount;
				$nkredit[1]=$discount;
			}
			else if ($discount==0 && $selisih!=0 && $akundsc!='-' && $akundsc!='') {
				$debet[0]=$acdebet;
				
				$kredit[0]=$ap;
				
				if ($selisih>0){//nilai selisih positif
					$debet[1]=$akundsc;
					$ndebet[0]=$grandtotal-$selisih;
					$nkredit[0]=$grandtotal;
					$ndebet[1]=$selisih;
				}
				else if ($selisih<0) {//nilai selisih negatif
					$kredit[1]=$akundsc;
					$ndebet[0]=$grandtotal;
					$nkredit[0]=$grandtotal-$selisih;
					$nkredit[1]=$selisih;
				}

			}
		}
		else if($ppns!=0&&$pphs==0){//dengan ppn tanpa pph
			//echo "warning: ".$discount." ".$akundsc." ".$selisih.""; 
			if (($discount!=0 && ($akundsc=='-' || $akundsc=='')) ||($selisih!=0 && ($akundsc=='-' || $akundsc=='')) || ($discount!=0 && $akundsc=='-') || ($discount==0 && $selisih==0 &&  ($akundsc=='-' || $akundsc==''))){
				
				$debet[0]=$acdebet;
				$debet[1]=$vatin;
				$kredit[0]=$ap;
				
				$ndebet[0]=$grandtotal-$ppns;
				$ndebet[1]=$ppns;
				$nkredit[0]=$grandtotal;
			}
			else if ($discount!=0 && $akundsc!='-' && $akundsc!='') {
				$debet[0]=$acdebet;
				$debet[1]=$vatin;
				$kredit[0]=$ap;
				$kredit[1]=$akundsc;
				
				$ndebet[0]=$grandtotal-$ppns;
				$ndebet[1]=$ppns;
				$nkredit[0]=$grandtotal-$discount;
				$nkredit[1]=$discount;
			}
			else if ($discount==0 && $selisih!=0 && $akundsc!='-' && $akundsc!='') {
				$debet[0]=$acdebet;
				$debet[1]=$vatin;
				
				$kredit[0]=$ap;
				$ndebet[1]=$ppns;
				if ($selisih>0){//nilai selisih positif
					$debet[2]=$akundsc;
					$ndebet[0]=$grandtotal-$ppns-$selisih;
					
					$ndebet[2]=$selisih;
					$nkredit[0]=$grandtotal;
				}
				else if ($selisih<0) {//nilai selisih negatif
					$kredit[1]=$akundsc;
					$ndebet[0]=$grandtotal-$ppns;
					$nkredit[0]=$grandtotal-$selisih;
					$nkredit[1]=$selisih;
				}
			}
		}
		else if($ppns==0&&$pphs!=0){//tanpa ppn dengan pph
			if (($discount!=0 && ($akundsc=='-' || $akundsc=='')) ||($selisih!=0 && ($akundsc=='-' || $akundsc=='')) || ($discount!=0 && $akundsc=='-') || ($discount==0 && $selisih==0 &&  ($akundsc=='-' || $akundsc==''))){
				$debet[0]=$acdebet;
				$kredit[0]=$ap;
				$kredit[1]=$accpph;
				$totalwip=$grandtotal+$pphs;
				$totalap=$grandtotal;
				$ndebet[0]=$totalwip;
				$nkredit[0]=$totalap;
				$nkredit[1]=$pphs;
			}
			else if ($discount!=0 && $akundsc!='-' && $akundsc!=''){
				$debet[0]=$acdebet;
				$kredit[0]=$ap;
				$kredit[1]=$accpph;
				$kredit[2]=$akundsc;
				$totalwip=$grandtotal+$pphs;
				$totalap=$grandtotal-$discount;
				$ndebet[0]=$totalwip;
				$nkredit[0]=$totalap;
				$nkredit[1]=$pphs;
				$nkredit[2]=$discount;
			}
			
			else if ($discount==0 && $selisih!=0 && $akundsc!='-' && $akundsc!=''){
				$debet[0]=$acdebet;
				
				$kredit[0]=$ap;
				$kredit[1]=$accpph;
				
				
				
				
				$nkredit[1]=$pphs;
				
				if ($selisih>0){//nilai selisih positif
					$debet[1]=$akundsc;
					$totalwip=$grandtotal+$pphs-$selisih;
					$ndebet[0]=$totalwip;
					$ndebet[1]=$selisih;
					$totalap=$grandtotal;
					$nkredit[0]=$totalap;
				}
				else if ($selisih<0) {//nilai selisih negatif
					$kredit[2]=$akundsc;
					$totalwip=$grandtotal+$pphs;
					$totalap=$grandtotal-$selisih;
					$ndebet[0]=$totalwip;
					$nkredit[0]=$totalap;
					$nkredit[2]=$selisih;
				}
				
			}
		}
		else if($ppns!=0&&$pphs!=0){//dengan ppn dan pph
			
			if (($discount!=0 && ($akundsc=='-' || $akundsc=='')) ||($selisih!=0 && ($akundsc=='-' || $akundsc=='')) || ($discount!=0 && $akundsc=='-') || ($discount==0 && $selisih==0 &&  ($akundsc=='-' || $akundsc==''))){
				$debet[0]=$acdebet;
				$debet[1]=$vatin;
				$kredit[0]=$ap;
				$kredit[1]=$accpph;
				$totalwip=$grandtotal+$pphs-$ppns;
				$totalap=$grandtotal;
				$ndebet[0]=$totalwip;
				$ndebet[1]=$ppns;
				$nkredit[0]=$totalap;
				$nkredit[1]=$pphs;
			}
			else if ($discount!=0 && $akundsc!='-' && $akundsc!=''){
				$debet[0]=$acdebet;
				$debet[1]=$vatin;
				$kredit[0]=$ap;
				$kredit[1]=$accpph;
				$kredit[2]=$akundsc;
				$totalwip=$grandtotal+$pphs-$ppns;
				$totalap=$grandtotal-$discount;
				$ndebet[0]=$totalwip;
				$ndebet[1]=$ppns;
				$nkredit[0]=$totalap;
				$nkredit[1]=$pphs;
				$nkredit[2]=$discount;
				
			}
			
			else if ($discount==0 && $selisih!=0 && $akundsc!='-' && $akundsc!=''){
				$debet[0]=$acdebet;
				$debet[1]=$vatin;
				
				$kredit[0]=$ap;
				$kredit[1]=$accpph;
				
				
				
				$ndebet[1]=$ppns;
				
				$nkredit[1]=$pphs;
				
				if ($selisih>0){//nilai selisih positif
					$debet[2]=$akundsc;
					$totalwip=$grandtotal+$pphs-$ppns-$selisih;
					$ndebet[0]=$totalwip;
					$ndebet[2]=$selisih;
					$totalap=$grandtotal;
					$nkredit[0]=$totalap;
				}
				else if ($selisih<0) {//nilai selisih negatif
					$kredit[2]=$akundsc;
					$totalwip=$grandtotal+$pphs-$ppns;
					$totalap=$grandtotal-$selisih;
					$ndebet[0]=$totalwip;
					$nkredit[0]=$totalap;
					$nkredit[2]=$selisih;
				}
				
			}
			
		}*/
	}
	//untuk dp SPK
	else if($smbdok==$dokspk){
		$grandtotals=$grandtotal;
		
		
		/*$debet[0]=$wip;
		$kredit[0]=$ap;
		$ndebet[0]=$grandtotal;
		//$nkredit[0]=$grandtotal;
		$nkredit[0]=$grandtotal-$discount;
		$nkredit[1]=$discount;
		
		
		if ($selisih>0){//nilai selisih positif
			$debet[1]=$akundsc;
			$ndebet[0]=$grandtotal-$selisih;
			$nkredit[0]=$grandtotal;
			$ndebet[1]=$selisih;
		}
		else if ($selisih<0) {//nilai selisih negatif
			$kredit[1]=$akundsc;
			$ndebet[0]=$grandtotal;
			$nkredit[0]=$grandtotal-$selisih;
			$nkredit[1]=$selisih;
		}
		$z=$nkredit[0]-$pphs;
		$nkredit[0]=$z;
		$kredit[2]=$accpph;
		$nkredit[2]=$pphs;*/
		
		//rubah jadi array_push ==Jo 04-05-2017==
		array_push($debet,$wip);
		array_push($kredit,$ap);
		array_push($ndebet,$grandtotal);
		
		if($discount!=0 && $akundsc!='-' && $akundsc!=''){
			array_push($kredit,$akundsc);
			array_push($nkredit,$grandtotal-$discount);
			array_push($nkredit,$discount);
		}
		else if($discount==0 && $selisih!=0 && $akundsc!='-' && $akundsc!=''){
			if ($selisih>0){//nilai selisih positif
			array_push($debet,$akundsc);
			array_push($ndebet,$grandtotal-$selisih);
			array_push($nkredit,$grandtotal);
			array_push($ndebet,$selisih);
			}
			else if ($selisih<0) {//nilai selisih negatif
				array_push($kredit,$akundsc);
				array_push($ndebet,$grandtotal);
				array_push($nkredit,$grandtotal-$selisih);
				array_push($nkredit,$selisih);
				
			}
		}
		else{
			array_push($nkredit,$grandtotal);
		}
		
		if($pphs!=0){
			$z=$ndebet[0]+$pphs;
			$ndebet[0]=$z;
			array_push($kredit,$accpph);
			array_push($nkredit,$pphs);
		}
		
		
		
		
		/*
		if($ppns==0&&$pphs==0){//tanpa ppn dan pph 	
				
			if 	(($discount!=0 && ($akundsc=='-' || $akundsc=='')) ||($selisih!=0 && ($akundsc=='-' || $akundsc=='')) || ($discount!=0 && $akundsc=='-') || ($discount==0 && $selisih==0 &&  ($akundsc=='-' || $akundsc==''))){
				$debet[0]=$wip;
				$kredit[0]=$ap;
				$ndebet[0]=$grandtotal;
				$nkredit[0]=$grandtotal;
			}
			else if ($discount!=0 && $akundsc!='-' && $akundsc!=''){
				$debet[0]=$wip;
				$kredit[0]=$ap;
				$kredit[1]=$akundsc;
				$ndebet[0]=$grandtotal;
				$nkredit[0]=$grandtotal-$discount;
				$nkredit[1]=$discount;
			}
			else if ($discount==0 && $selisih!=0 && $akundsc!='-' && $akundsc!='') {
				$debet[0]=$wip;
				
				$kredit[0]=$ap;
				
				if ($selisih>0){//nilai selisih positif
					$debet[1]=$akundsc;
					$ndebet[0]=$grandtotal-$selisih;
					$nkredit[0]=$grandtotal;
					$ndebet[1]=$selisih;
				}
				else if ($selisih<0) {//nilai selisih negatif
					$kredit[1]=$akundsc;
					$ndebet[0]=$grandtotal;
					$nkredit[0]=$grandtotal-$selisih;
					$nkredit[1]=$selisih;
				}
				
				
				
			}
		}
		else if($ppns!=0&&$pphs==0){//dengan ppn tanpa pph
			
			if (($discount!=0 && ($akundsc=='-' || $akundsc=='')) ||($selisih!=0 && ($akundsc=='-' || $akundsc=='')) || ($discount!=0 && $akundsc=='-') || ($discount==0 && $selisih==0 &&  ($akundsc=='-' || $akundsc==''))){
				$debet[0]=$wip;
				$debet[1]=$vatin;
				$kredit[0]=$ap;
				
				$ndebet[0]=$grandtotal-$ppns;
				$ndebet[1]=$ppns;
				$nkredit[0]=$grandtotal;
			}
			else if ($discount!=0 && $akundsc!='-' && $akundsc!='') {
				$debet[0]=$wip;
				$debet[1]=$vatin;
				$kredit[0]=$ap;
				$kredit[1]=$akundsc;
				
				$ndebet[0]=$grandtotal-$ppns;
				$ndebet[1]=$ppns;
				$nkredit[0]=$grandtotal-$discount;
				$nkredit[1]=$discount;
			}
			else if ($discount==0 && $selisih!=0 && $akundsc!='-' && $akundsc!='') {
				$debet[0]=$wip;
				$debet[1]=$vatin;
				
				$kredit[0]=$ap;
				
				
				
				$ndebet[1]=$ppns;
				
				
				
				if ($selisih>0){//nilai selisih positif
					$debet[2]=$akundsc;
					$ndebet[0]=$grandtotal-$ppns-$selisih;
					$ndebet[2]=$selisih;
					$nkredit[0]=$grandtotal;
				}
				else if ($selisih<0) {//nilai selisih negatif
					$kredit[1]=$akundsc;
					$ndebet[0]=$grandtotal-$ppns;
					$nkredit[0]=$grandtotal-$selisih;
					$nkredit[1]=$selisih;
				}
			}
		}
		else if ($ppns==0&&$pphs!=0){//tanpa ppn dengan pph
			if (($discount!=0 && ($akundsc=='-' || $akundsc=='')) ||($selisih!=0 && ($akundsc=='-' || $akundsc=='')) || ($discount!=0 && $akundsc=='-') || ($discount==0 && $selisih==0 &&  ($akundsc=='-' || $akundsc==''))){
				$debet[0]=$wip;
				$kredit[0]=$ap;
				$kredit[1]=$accpph;
				$totalwip=$grandtotal+$pphs;
				$totalap=$grandtotal;
				$ndebet[0]=$totalwip;
				$nkredit[0]=$totalap;
				$nkredit[1]=$pphs;
			}
			else if ($discount!=0 && $akundsc!='-' && $akundsc!=''){
				$debet[0]=$wip;
				$kredit[0]=$ap;
				$kredit[1]=$accpph;
				$kredit[2]=$akundsc;
				$totalwip=$grandtotal+$pphs;
				$totalap=$grandtotal-$discount;
				$ndebet[0]=$totalwip;
				$nkredit[0]=$totalap;
				$nkredit[1]=$pphs;
				$nkredit[2]=$discount;
				
			}
			
			else if ($discount==0 && $selisih!=0 && $akundsc!='-' && $akundsc!=''){
				$debet[0]=$wip;
				
				$kredit[0]=$ap;
				$kredit[1]=$accpph;
				
				
				$nkredit[1]=$pphs;
				
				if ($selisih>0){//nilai selisih positif
					$debet[1]=$akundsc;
					$totalwip=$grandtotal+$pphs-$selisih;
					$ndebet[0]=$totalwip;
					$ndebet[1]=$selisih;
					$totalap=$grandtotal;
					$nkredit[0]=$totalap;
				}
				else if ($selisih<0) {//nilai selisih negatif
					$kredit[2]=$akundsc;
					$totalwip=$grandtotal+$pphs;
					$totalap=$grandtotal-$selisih;
					$ndebet[0]=$totalwip;
					$nkredit[0]=$totalap;
					$nkredit[2]=$selisih;
				}
				
			}
		}
		else if($ppns!=0&&$pphs!=0){//dengan ppn dan pph
			
			if (($discount!=0 && ($akundsc=='-' || $akundsc=='')) ||($selisih!=0 && ($akundsc=='-' || $akundsc=='')) || ($discount!=0 && $akundsc=='-') || ($discount==0 && $selisih==0 &&  ($akundsc=='-' || $akundsc==''))){
				$debet[0]=$wip;
				$debet[1]=$vatin;
				$kredit[0]=$ap;
				$kredit[1]=$accpph;
				$totalwip=$grandtotal+$pphs-$ppns;
				$totalap=$grandtotal;
				$ndebet[0]=$totalwip;
				$ndebet[1]=$ppns;
				$nkredit[0]=$totalap;
				$nkredit[1]=$pphs;
			}
			else if ($discount!=0 && $akundsc!='-' && $akundsc!=''){
				$debet[0]=$wip;
				$debet[1]=$vatin;
				$kredit[0]=$ap;
				$kredit[1]=$accpph;
				$kredit[2]=$akundsc;
				$totalwip=$grandtotal+$pphs-$ppns;
				$totalap=$grandtotal-$discount;
				$ndebet[0]=$totalwip;
				$ndebet[1]=$ppns;
				$nkredit[0]=$totalap;
				$nkredit[1]=$pphs;
				$nkredit[2]=$discount;
				
			}
			
			else if ($discount==0 && $selisih!=0 && $akundsc!='-' && $akundsc!=''){
				$debet[0]=$wip;
				$debet[1]=$vatin;
				
				$kredit[0]=$ap;
				$kredit[1]=$accpph;
				
				
				
				$ndebet[1]=$ppns;
				
				$nkredit[1]=$pphs;
				
				if ($selisih>0){//nilai selisih positif
					$debet[2]=$akundsc;
					$totalwip=$grandtotal+$pphs-$ppns-$selisih;
					$ndebet[0]=$totalwip;
					$ndebet[2]=$selisih;
					$totalap=$grandtotal;
					$nkredit[0]=$totalap;
				}
				else if ($selisih<0) {//nilai selisih negatif
					$kredit[2]=$akundsc;
					$totalwip=$grandtotal+$pphs-$ppns;
					$totalap=$grandtotal-$selisih;
					$ndebet[0]=$totalwip;
					$nkredit[0]=$totalap;
					$nkredit[2]=$selisih;
				}
				
			}
			
		}*/
	}
	//untuk BA SPK
	/*else if($smbdok==$dokbaspk){
		$slnospk="select spk from log_spk_ba where id=".$nodok."";
		$resnospk=$eksi->sSQL($slnospk);
		foreach($resnospk as $barnospk){
			$nospk=$barnospk['spk'];
		}
		
		$idspk="";
		$slbaspk="select id from log_spk_ba where spk='".$nospk."' and posting=1";
		$resbaspk=$eksi->sSQL($slbaspk);
		foreach($resbaspk as $barbaspk){
			$idspk.="'".$barbaspk['id']."',";
		}
		$idspks=substr($idspk,0,(strlen($idspk)-1));
		$slspk="select spk from log_spkdt_new where spk='".$nodok."'";
		$resspk=$eksi->sSQL($slspk);
		foreach($resspk as $barspk){
			$nospk=$barspk['spk'];
		}
		
		$sltospk="select nilai from log_spkht_new where nospk='".$nospk."'";
		$restospk=$eksi->sSQL($sltospk);
		foreach($restospk as $bartospk){
			$jmtospk=$bartospk['nilai'];//jumlah total spk
		}
		
		$slfirst="SELECT 'invc' jenis, (nett+selisih) as nett, updatetime FROM keu_trx_ht where nodokumen in('".$nospk."',".$idspks.") and status=3 
		union all
		SELECT 'ba' jenis, nominaldpp, updated from log_spk_ba
		where posting=1 and spk= '".$nospk."' having (nominaldpp and updated) <> '' 
		order by updatetime,jenis;";
		$ttlfirst=$eksi->sSQLnum($slfirst);
		
		//echo "warning: ".$slfirst;
		$resfirst=$eksi->sSQL($slfirst);
		$firstdt=Array();
		$idx=0;
		$totalinvc=0;
		$totalba=0;
		foreach($resfirst as $barfirst){
			$firstdt[$idx]=$barfirst['jenis'];
			if ($firstdt[$idx]=='invc'){
				$totalinvc+=$barfirst['nett'];
			}
			if ($firstdt[$idx]=='ba'){
				$totalba+=$barfirst['nett'];
			}
			$idx++;
		}
		$totalnow=$totalinvc+($grandtotal+$selisih-$ppns+$pphs-$pbbkbs);
		//echo "warning: ttlfirst: ".$ttlfirst." firstdt[$idx-1]: ".$firstdt[$idx-1]." totalinvc: ".$totalinvc." ".$jmtospk;
		if ($ttlfirst>0 && $firstdt[$idx-1]=='ba' && ($totalinvc<$jmtospk || $totalinvc==$jmtospk)){//Sudah ba, Invoice atas ba
			if($ppns==0 && $pphs==0){//tanpa ppn dan pph 

				if (($discount!=0 && ($akundsc=='-' || $akundsc=='')) ||($selisih!=0 && ($akundsc=='-' || $akundsc=='')) || ($discount!=0 && $akundsc=='-') || ($discount==0 && $selisih==0 &&  ($akundsc=='-' || $akundsc==''))){
					$debet[0]=$apaccrued;
					$kredit[0]=$ap;
					$ndebet[0]=$nett-$totalinvc;
					$nkredit[0]=$nett-$totalinvc;
				}
				else if ($discount!=0 && $akundsc!='-' && $akundsc!=''){
					$debet[0]=$apaccrued;
					$kredit[0]=$ap;
					$kredit[1]=$akundsc;
					$ndebet[0]=$nett-$totalinvc;
					$nkredit[0]=$nett-$totalinvc-$discount;
					$nkredit[1]=$discount;
				}
				else if ($discount==0 && $selisih!=0 && $akundsc!='-' && $akundsc!=''){
					$debet[0]=$apaccrued;
					
					$kredit[0]=$ap;
					
					if ($selisih>0){//nilai selisih positif
						$debet[1]=$akundsc;
						$ndebet[0]=$nett-$totalinvc-$selisih;
						$ndebet[1]=$selisih;
						$nkredit[0]=$nett-$totalinvc;
					}
					else if ($selisih<0) {//nilai selisih negatif
						$kredit[1]=$akundsc;
						$ndebet[0]=$nett-$totalinvc;
						$nkredit[0]=$nett-$totalinvc-$selisih;
						$nkredit[1]=$selisih;
					}
				}
				$grandtotals=$nett+$selisih-$totalinvc;
			}
			else if($ppns!=0&&$pphs==0){//dengan ppn tanpa pph
				$nilaippns=($persenppn/100)*($nett+$selisih-$totalinvc);
				if (($discount!=0 && ($akundsc=='-' || $akundsc=='')) ||($selisih!=0 && ($akundsc=='-' || $akundsc=='')) || ($discount!=0 && $akundsc=='-') || ($discount==0 && $selisih==0 &&  ($akundsc=='-' || $akundsc==''))){
					$debet[0]=$apaccrued;
					$debet[1]=$vatin;
					$kredit[0]=$ap;
					$totals=$nett-$totalinvc;
					$ndebet[0]=$totals;
					$ndebet[1]=$nilaippns;
					$nkredit[0]=$nett-$totalinvc+$nilaippns;
				}
				else if ($discount!=0 && $akundsc!='-' && $akundsc!='') {
					$debet[0]=$apaccrued;
					$debet[1]=$vatin;
					$kredit[0]=$ap;
					$kredit[1]=$akundsc;
					$totals=$nett-$totalinvc;
					$ndebet[0]=$totals;
					$ndebet[1]=$nilaippns;
					$nkredit[0]=$nett-$discount-$totalinvc+$nilaippns;
					$nkredit[1]=$discount;
				}
				
				else if ($discount==0 && $selisih!=0 && $akundsc!='-' && $akundsc!='') {
					$debet[0]=$apaccrued;
					$debet[1]=$vatin;
					
					$kredit[0]=$ap;
				
					$ndebet[1]=$nilaippns;

					if ($selisih>0){//nilai selisih positif
						$debet[2]=$akundsc;
						$ndebet[0]=$nett-$totalinvc-$selisih;
						$ndebet[2]=$selisih;
						$nkredit[0]=$nett-$totalinvc+$nilaippns;
					}
					else if ($selisih<0) {//nilai selisih negatif
						$kredit[1]=$akundsc;
						$ndebet[0]=$nett-$nilaippns;
						$nkredit[0]=$nett-$selisih-$totalinvc+$nilaippns;
						$nkredit[1]=$selisih;
					}
				}
				$grandtotals=$nett+$selisih-$totalinvc+$nilaippns;
			}
			else if($ppns==0&&$pphs!=0){//tanpa ppn dengan pph
				$nilaipphs=($persenpph/100)*($nett+$selisih-$totalinvc);
				if (($discount!=0 && ($akundsc=='-' || $akundsc=='')) ||($selisih!=0 && ($akundsc=='-' || $akundsc=='')) || ($discount!=0 && $akundsc=='-') || ($discount==0 && $selisih==0 &&  ($akundsc=='-' || $akundsc==''))){
					$debet[0]=$apaccrued;
					$kredit[0]=$ap;
					$kredit[1]=$accpph;
					$totalwip=$nett-$totalinvc+$nilaipphs;
					$totalap=$nett-$totalinvc;
					$ndebet[0]=$totalwip;
					$nkredit[0]=$totalap;
					$nkredit[1]=$nilaipphs;
				}
				else if ($discount!=0 && $akundsc!='-' && $akundsc!='') {
					$debet[0]=$apaccrued;
					$kredit[0]=$ap;
					$kredit[1]=$accpph;
					$kredit[2]=$akundsc;
					$totalwip=$nett-$totalinvc+$nilaipphs;
					$totalap=$nett-$discount-$totalinvc;
					$ndebet[0]=$totalwip;
					$nkredit[0]=$totalap;
					$nkredit[1]=$nilaipphs;
					$nkredit[2]=$discount;
				}
				else if ($discount==0 && $selisih!=0 && $akundsc!='-' && $akundsc!='') {
					$debet[0]=$apaccrued;
					
					$kredit[0]=$ap;
					$kredit[1]=$accpph;
					
					
					
					
					
					
					$nkredit[1]=$nilaipphs;
					
					if ($selisih>0){//nilai selisih positif
						$debet[1]=$akundsc;
						$totalwip=$nett-$totalinvc-$selisih;
						$totalap=$nett-$totalinvc+$nilaipphs;
						$ndebet[0]=$totalwip;
						$ndebet[1]=$selisih;
						$nkredit[0]=$totalap;
					}
					else if ($selisih<0) {//nilai selisih negatif
						$kredit[2]=$akundsc;
						$totalwip=$nett-$totalinvc+$nilaipphs;
						$totalap=$nett-$totalinvc-$selisih;
						$ndebet[0]=$totalwip;
						$nkredit[0]=$totalap;
						$nkredit[2]=$selisih;
					}
				}
				$grandtotals=$nett+$selisih-$totalinvc+$nilaipphs;
			}
			else if($ppns!=0&&$pphs!=0){//dengan ppn dan pph
				$nilaippns=($persenppn/100)*($nett+$selisih-$totalinvc);
				$nilaipphs=($persenpph/100)*($nett+$selisih-$totalinvc);
				if (($discount!=0 && ($akundsc=='-' || $akundsc=='')) ||($selisih!=0 && ($akundsc=='-' || $akundsc=='')) || ($discount!=0 && $akundsc=='-') || ($discount==0 && $selisih==0 &&  ($akundsc=='-' || $akundsc==''))){
					$debet[0]=$apaccrued;
					$debet[1]=$vatin;
					$kredit[0]=$ap;
					$kredit[1]=$accpph;
					$totalwip=$grandtotal-$totalinvc+$nilaipphs;
					$totalap=$grandtotal-$totalinvc+$nilaippns;
					$ndebet[0]=$totalwip;
					$ndebet[1]=$nilaippns;
					$nkredit[0]=$totalap;
					$nkredit[1]=$nilaipphs;
				}
				else if ($discount!=0 && $akundsc!='-' && $akundsc!='') {
					$debet[0]=$apaccrued;
					$debet[1]=$vatin;
					$kredit[0]=$ap;
					$kredit[1]=$accpph;
					$kredit[2]=$akundsc;
					$totalwip=$grandtotal-$totalinvc+$nilaipphs;
					$totalap=$grandtotal-$totalinvc+$nilaippns-$discount;
					$ndebet[0]=$totalwip;
					$ndebet[1]=$nilaippns;
					$nkredit[0]=$totalap;
					$nkredit[1]=$nilaipphs;
					$nkredit[2]=$discount;
				}
				else if ($discount==0 && $selisih!=0 && $akundsc!='-' && $akundsc!='') {
					$debet[0]=$apaccrued;
					$debet[1]=$vatin;
					
					$kredit[0]=$ap;
					$kredit[1]=$accpph;
					
					
					
					
					$ndebet[1]=$nilaippns;
					
					
					$nkredit[1]=$nilaipphs;
					
					if ($selisih>0){//nilai selisih positif
						$debet[2]=$akundsc;
						$totalwip=$grandtotal-$totalinvc+$nilaipphs-$selisih;
						$totalap=$grandtotal-$totalinvc+$nilaippns;
						$ndebet[0]=$totalwip;
						$ndebet[2]=$selisih;
						$nkredit[0]=$totalap;
					}
					else if ($selisih<0) {//nilai selisih negatif
						$kredit[2]=$akundsc;
						$totalwip=$grandtotal-$totalinvc+$nilaipphs;
						$totalap=$grandtotal-$totalinvc+$nilaippns-$selisih;
						$ndebet[0]=$totalwip;
						$nkredit[0]=$totalap;
						$nkredit[2]=$selisih;
					}
				}
				$grandtotals=$nett+$selisih-$totalinvc+$nilaipphs;
				
			}
		}
		
		
	}*/
	//untuk CIP
	else if($smbdok==$dokcip){
		$grandtotals=$grandtotal;
		$slasset="select ifnull(a.isPosting,0)as isPosting,b.akunak as cipacc, a.noakun as akunbiaya from log_cipht a left join sdm_5tipeasset b on a.kodetipe=b.kodetipe where a.nocip='".$nodok."'";
		$resasset=$eksi->sSQL($slasset);
		foreach($resasset as $barasset){
			$cipacc=$barasset['cipacc'];
			$cipacby=$barasset['akunbiaya'];
			$cipposting=$barasset['isPosting'];
		}		
		
		$debet[0]=$cipacc;
		$kredit[0]=$ap;
		$kredit[1]=$akundsc;
		$ndebet[0]=$grandtotal+$discount;
		$nkredit[0]=$grandtotal;
		$nkredit[1]=$discount;
		
		if ($selisih>0){//nilai selisih positif
			$debet[2]=$akundsc;
			$ndebet[2]=$selisih;
			$nkredit[0]=$nkredit[0]+$selisih;
		}
		else if ($selisih<0) {//nilai selisih negatif
			$kredit[2]=$akundsc;
			$nkredit[2]=$selisih;
			$ndebet[0]=$ndebet[0]+$selisih;
		}
	/*
		
		if($ppns==0&&$pphs==0){//tanpa ppn dan pph 	
				
			if 	(($discount!=0 && ($akundsc=='-' || $akundsc=='')) ||($selisih!=0 && ($akundsc=='-' || $akundsc=='')) || ($discount!=0 && $akundsc=='-') || ($discount==0 && $selisih==0 &&  ($akundsc=='-' || $akundsc==''))){
				$debet[0]=$cipacc;
				$kredit[0]=$ap;
				$ndebet[0]=$grandtotal;
				$nkredit[0]=$grandtotal;
			}
			else if ($discount!=0 && $akundsc!='-' && $akundsc!=''){
				$debet[0]=$cipacc;
				$kredit[0]=$ap;
				$kredit[1]=$akundsc;
				$ndebet[0]=$grandtotal;
				$nkredit[0]=$grandtotal-$discount;
				$nkredit[1]=$discount;
			}
			else if ($discount==0 && $selisih!=0 && $akundsc!='-' && $akundsc!='') {
				$debet[0]=$cipacc;
				
				$kredit[0]=$ap;
				
				if ($selisih>0){//nilai selisih positif
					$debet[1]=$akundsc;
					$ndebet[0]=$grandtotal-$selisih;
					$nkredit[0]=$grandtotal;
					$ndebet[1]=$selisih;
				}
				else if ($selisih<0) {//nilai selisih negatif
					$kredit[1]=$akundsc;
					$ndebet[0]=$grandtotal;
					$nkredit[0]=$grandtotal-$selisih;
					$nkredit[1]=$selisih;
				}
				
				
				
			}
		}
		else if($ppns!=0&&$pphs==0){//dengan ppn tanpa pph
			
			if (($discount!=0 && ($akundsc=='-' || $akundsc=='')) ||($selisih!=0 && ($akundsc=='-' || $akundsc=='')) || ($discount!=0 && $akundsc=='-') || ($discount==0 && $selisih==0 &&  ($akundsc=='-' || $akundsc==''))){
				$debet[0]=$cipacc;
				$debet[1]=$vatin;
				$kredit[0]=$ap;
				
				$ndebet[0]=$grandtotal;//-$ppns;
				//$ndebet[1]=$ppns;
				$nkredit[0]=$grandtotal;
			}
			else if ($discount!=0 && $akundsc!='-' && $akundsc!='') {
				$debet[0]=$cipacc;
				$debet[1]=$vatin;
				$kredit[0]=$ap;
				$kredit[1]=$akundsc;
				
				$ndebet[0]=$grandtotal;//-$ppns;
				//$ndebet[1]=$ppns;
				$nkredit[0]=$grandtotal-$discount;
				$nkredit[1]=$discount;
			}
			else if ($discount==0 && $selisih!=0 && $akundsc!='-' && $akundsc!='') {
				$debet[0]=$cipacc;
				$debet[1]=$vatin;
				
				$kredit[0]=$ap;
				

				//$ndebet[1]=$ppns;
				
				if ($selisih>0){//nilai selisih positif
					$debet[2]=$akundsc;
					$ndebet[0]=$grandtotal-$selisih;//-$ppns-$selisih;
					$ndebet[2]=$selisih;
					$nkredit[0]=$grandtotal;
				}
				else if ($selisih<0) {//nilai selisih negatif
					$kredit[1]=$akundsc;
					$ndebet[0]=$grandtotal;//-$ppns;
					$nkredit[0]=$grandtotal-$selisih;
					$nkredit[1]=$selisih;
				}
			}
		}
		else if($ppns==0&&$pphs!=0){//tanpa ppn dengan pph
			if (($discount!=0 && ($akundsc=='-' || $akundsc=='')) ||($selisih!=0 && ($akundsc=='-' || $akundsc=='')) || ($discount!=0 && $akundsc=='-') || ($discount==0 && $selisih==0 &&  ($akundsc=='-' || $akundsc==''))){
				$debet[0]=$cipacc;
				$kredit[0]=$ap;
				$kredit[1]=$accpph;
				$totalwip=$grandtotal+$pphs;
				$totalap=$grandtotal;
				$ndebet[0]=$totalwip;
				$nkredit[0]=$totalap;
				$nkredit[1]=$pphs;
			}
			else if ($discount!=0 && $akundsc!='-' && $akundsc!=''){
				$debet[0]=$cipacc;
				$kredit[0]=$ap;
				$kredit[1]=$accpph;
				$kredit[2]=$akundsc;
				$totalwip=$grandtotal+$pphs;
				$totalap=$grandtotal-$discount;
				$ndebet[0]=$totalwip;
				$nkredit[0]=$totalap;
				$nkredit[1]=$pphs;
				$nkredit[2]=$discount;
				
			}
			
			else if ($discount==0 && $selisih!=0 && $akundsc!='-' && $akundsc!=''){
				$debet[0]=$cipacc;
				
				$kredit[0]=$ap;
				$kredit[1]=$accpph;
				
				
				$nkredit[1]=$pphs;
				
				if ($selisih>0){//nilai selisih positif
					$debet[1]=$akundsc;
					$totalwip=$grandtotal+$pphs-$selisih;
					$ndebet[0]=$totalwip;
					$ndebet[1]=$selisih;
					$totalap=$grandtotal;
					$nkredit[0]=$totalap;
				}
				else if ($selisih<0) {//nilai selisih negatif
					$kredit[2]=$akundsc;
					$totalwip=$grandtotal+$pphs;
					$totalap=$grandtotal-$selisih;
					$ndebet[0]=$totalwip;
					$nkredit[0]=$totalap;
					$nkredit[2]=$selisih;
				}
				
			}
		}
		else if($ppns!=0&&$pphs!=0){//dengan pph dan pph
			
			if (($discount!=0 && ($akundsc=='-' || $akundsc=='')) ||($selisih!=0 && ($akundsc=='-' || $akundsc=='')) || ($discount!=0 && $akundsc=='-') || ($discount==0 && $selisih==0 &&  ($akundsc=='-' || $akundsc==''))){
				$debet[0]=$cipacc;
				$debet[1]=$vatin;
				$kredit[0]=$ap;
				$kredit[1]=$accpph;
				$totalwip=$grandtotal+$pphs-$ppns;
				$totalap=$grandtotal;
				$ndebet[0]=$totalwip;
				$ndebet[1]=$ppns;
				$nkredit[0]=$totalap;
				$nkredit[1]=$pphs;
			}
			else if ($discount!=0 && $akundsc!='-' && $akundsc!=''){
				$debet[0]=$cipacc;
				$debet[1]=$vatin;
				$kredit[0]=$ap;
				$kredit[1]=$accpph;
				$kredit[2]=$akundsc;
				$totalwip=$grandtotal+$pphs-$ppns;
				$totalap=$grandtotal-$discount;
				$ndebet[0]=$totalwip;
				$ndebet[1]=$ppns;
				$nkredit[0]=$totalap;
				$nkredit[1]=$pphs;
				$nkredit[2]=$discount;
				
			}
			
			else if ($discount==0 && $selisih!=0 && $akundsc!='-' && $akundsc!=''){
				$debet[0]=$cipacc;
				$debet[1]=$vatin;
				
				$kredit[0]=$ap;
				$kredit[1]=$accpph;
				
				
				
				$ndebet[1]=$ppns;
				
				$nkredit[1]=$pphs;
				
				if ($selisih>0){//nilai selisih positif
					$debet[2]=$akundsc;
					$totalwip=$grandtotal+$pphs-$ppns-$selisih;
					$ndebet[0]=$totalwip;
					$ndebet[2]=$selisih;
					$totalap=$grandtotal;
					$nkredit[0]=$totalap;
				}
				else if ($selisih<0) {//nilai selisih negatif
					$kredit[2]=$akundsc;
					$totalwip=$grandtotal+$pphs-$ppns;
					$totalap=$grandtotal-$selisih;
					$ndebet[0]=$totalwip;
					$nkredit[0]=$totalap;
					$nkredit[2]=$selisih;
				}
				
			}
			
		}
		*/
	}
	
	
	if ($smbdok==$dokcip && $cipposting==1){//merupakan cip yang sudah diposting
		echo $_SESSION['lang']['cipsudahposting'];
	}
	else {
		//kode,nocounter jurnal
		$kodejurnal='';
		$slkdjr="select prefix,nokounter from keu_5strx where kode=".$strxtype." LIMIT 1";
		$reskdjr=$eksi->sSQL($slkdjr);
		foreach($reskdjr as $barkdjr){
			$kodejurnal=$barkdjr['prefix'];
			$counters=$barkdjr['nokounter'];
		}
		
		//rubah jadi lebih simple ==SAS/Jo 20-03-2017==
		$ncounter=intval($counters)+1;
		$nocounter="0000".strval($ncounter);
		$nocounters=substr(trim($nocounter),strlen(trim($nocounter))-3,4);
		
		$nojurnal=str_replace("-","",date('Y-m-d'))."/".$_SESSION['empl']['lokasitugas']."/".$kodejurnal."/".$nocounters;
		$sldok="select nama from  setup_5parameter where kode='".$smbdok."'";
		$resdok=$eksi->sSQL($sldok);
		foreach($resdok as $bardok){
			$namadok=$bardok['nama'];
		}

		//$ketjurnal="Posting ".$_SESSION['lang']['tagihanmasuk']." ".$namadok;
		
		//rubah keterangan jurnal ==Jo 22-03-2017==
		//tambah nama vendor di keterangan ==Jo 08-05-2017==
		$ketjurnal=$namaspl." ".chr(13).chr(10).$keterangans." ".chr(13).chr(10)." Invoice No: ".$noinvoice;
		
		
		//posting ke jurnal
		//header jurnal
		$header=array("nojurnal"=>"'".$nojurnal."'",
					  "kodejurnal"=>"'".$kodejurnal."'",
					  "tanggal"=>"'".date('Ymd')."'",
					  "tanggalentry"=>"'".date('Ymd')."'",
					  "posting"=>"0",
					  "totaldebet"=>"".$grandtotals."",
					  "totalkredit"=>"".-1*$grandtotals."",
					  "amountkoreksi"=>"0",
					  "noreferensi"=>"'".$nocountertr."'",
					  "autojurnal"=>"1",
					  "matauang"=>"'".$matauang."'",
					  "kurs"=>"'".$kurs."'",
					  "revisi"=>"0");
		$eksi->hapus("keu_jurnalht"," WHERE nojurnal='".$nojurnal."'");
		$eksi->hapus("keu_jurnaldt"," WHERE nojurnal='".$nojurnal."'");		
		$stringhd=$eksi->genSQL('keu_jurnalht',$header,false);
		//echo "warning: ".$stringhd;
		if($grandtotals!=0){
			$postHeader=$eksi->exc($stringhd);
			if($postHeader){
				if (count($debet)==0 || count($kredit)==0){
					$delheader=$eksi->hapus("keu_jurnalht"," WHERE nojurnal='".$nojurnal."'");
					if ($delheader){
						echo $_SESSION['lang']['simpangagal'];
					}
				}
				else {
					/*
					$hasilku=" Debet ";
					for($i=0;$i<count($debet);$i++){
					$hasilku.=strval($debet[$i])."/".strval($ndebet[$i])."\n";
					}
					
					$hasilku.=" Kredit";
					for($i=0;$i<count($kredit);$i++){
					$hasilku.=strval($kredit[$i])."/".strval($nkredit[$i])."\n";
					}
					
					
					ECHO "Warning: ".$hasilku;
					exit;
					*/
					//variabel untuk hitung posting debet dan kredit yang berhasil ==Jo 04-05-2017==
					$pdb=0;
					$pkr=0;
					//detail jurnal (debet dan kredit)
					//debet
					$nourut=1;
					for($i=0;$i<count($debet);$i++){
						if ($ndebet[$i]>0){
							$insdebet=array("nojurnal"=>"'".$nojurnal."'",
								  "tanggal"=>"'".date('Ymd')."'",
								  "nourut"=>"".$nourut."",
								  "noakun"=>"'".$debet[$i]."'",
								  "keterangan"=>"'".$ketjurnal."'",
								  "jumlah"=>"".$ndebet[$i]."",
								  "matauang"=>"'".$matauang."'",
								  "kurs"=>"".$kurs."",
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
								  "keterangan"=>"'".$ketjurnal."'",
								  "jumlah"=>"".-1*$nkredit[$i]."",
								  "matauang"=>"'".$matauang."'",
								  "kurs"=>"".$kurs."",
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
						//echo "warning: ".$stringkredit;
						$qkredit=$eksi->exc($stringkredit);
						if($qkredit){
							$pkr++;
							$nourut++;
						}
					}
					//rubah kondisi update status posting transaksi posting ==Jo 04-05-2017==
					if(count($debet)==$pdb || count($kredit)==$pkr ){
						$updates=array("status"=>"".$status."",
									"updateby"=>"'".$_SESSION['standard']['userid']."'" );
					
						$string=$eksi->genSQL('keu_trx_ht',$updates,true)." 
						WHERE  nocounter='".$nocountertr."'";
						
						
						//echo "warning: ".$string;
						$hasil=$eksi->exc($string);
						
						if(!$hasil){
							echo $_SESSION['lang']['simpangagal'];
						}else {
							//$upcounter=array("nokounter"=>"".$nocounters."");
							//rubah jadi variabel yang disimplekan ==SAS/Jo ==20-03-2017==
							$upcounter=array("nokounter"=>"".$ncounter."");
			
							$stcounter=$eksi->genSQL('keu_5strx',$upcounter,true)." 
							WHERE prefix='".$kodejurnal."' and kode=".$strxtype."";
							//echo "warning: ".$stcounter;
							$hasilct=$eksi->exc($stcounter);
							if($hasilct){
								if ($smbdok==$dokcip){
									$hargasatuancip=$grandtotal;//+$pphs-$ppns;
									$jmms=0;
									$slcip="select keterangan from log_cipht where nocip='".$nodok."'";
									$rescip=$eksi->sSQL($slcip);
									foreach($rescip as $barcip){
										$ketcip=$barcip['keterangan'];
									}
									//insert ke log_cipdt_for_jurnal untuk menambah asset == edited JO 06-03-2017==
									$slbarang="select kodebarang from log_5masterbarang where itemNonPo=1";
									$resbarang=$eksi->sSQL($slbarang);
									$sumbarang=$eksi->sSQLnum($slbarang);
									foreach($resbarang as $barbarang){
									$inscipdt=array("nocip"=>"'".$nodok."'",
										  "kodebarang"=>"'".$barbarang['kodebarang']."'",
										  "jumlah"=>"1",
										  "hargasatuan"=>"'".$hargasatuancip."'",
										  "keterangan"=>"'".$keterangans."'",
										  "docno"=>"'".$nocountertr."'",
										  "create_by"=>"'".$_SESSION['standard']['userid']."'",
										  "isgrn"=>"1");
										$stringcipdt=$eksi->genSQL('log_cipdt',$inscipdt,false);
										$qcipdt=$eksi->exc($stringcipdt);
										
			
										$ssql="SELECT `id` as urut FROM log_cipdt WHERE nocip='".$nodok."' AND kodebarang='".$barbarang['kodebarang']."' AND docno='".$nocountertr."' ORDER BY urut DESC LIMIT 1";
										$rxc=$eksi->sSQL($ssql);
										$cipdtid=0;
										foreach($rxc as $r1)
										{
											$cipdtid=$r1['urut'];
										}
										$query3="select kodetipe,noakun from ".$dbname.".log_cipht where nocip='".$nodok."' limit 0,1";
										$quez=mysql_query($query3) or die(mysql_error());
										while($res2=mysql_fetch_object($quez)){
											$cipacby=$res2->noakun;
										}
										$inscipjn=array("nocip"=>"'".$nodok."'",
										  "kodebarang"=>"'".$barbarang['kodebarang']."'",
										  "noakunasset"=>"'".$cipacby."'",
										  "jumlah"=>"1",
										  "hargasatuan"=>"'".$hargasatuancip."'",
										  "subtotal"=>"'".$hargasatuancip."'",
										  "isAsset"=>"0",
										  "keterangan"=>"'".$keterangans."'",
										  "cipdtid"=>"".$cipdtid."",
										  "create_by"=>"'".$_SESSION['standard']['userid']."'");
										$stringcipjrdt=$eksi->genSQL('log_cipdt_for_jurnal',$inscipjn,false);
										$qcipjrdt=$eksi->exc($stringcipjrdt);
										
										if ($qcipjrdt && $qcipdt){
											$jmms++;
										}
									}
									
									if ($jmms==$sumbarang){
										echo $_SESSION['lang']['dataposted'];
									}
									else {
										echo $_SESSION['lang']['simpangagal'];
									}
								}
								else {
									echo $_SESSION['lang']['dataposted'];
								}
								
							}
							else {
								echo $_SESSION['lang']['simpangagal'];
							}
						}
					}
				}
				
			}
			else {
				//tambah hapus header jika gagal simpan
				$delheader=$eksi->hapus("keu_jurnalht"," WHERE nojurnal='".$nojurnal."'");
				if ($delheader){
					echo $_SESSION['lang']['simpangagal'];
				}
			}
		}
		else{//untuk total 0 ==Jo 27-05-2017==
			$updates=array("status"=>"".$status."",
									"updateby"=>"'".$_SESSION['standard']['userid']."'" );
					
			$string=$eksi->genSQL('keu_trx_ht',$updates,true)." 
			WHERE  nocounter='".$nocountertr."'";
			
			//echo "warning: ".$string;
			$hasil=$eksi->exc($string);
			
			if(!$hasil){
				echo $_SESSION['lang']['simpangagal'];
			}else {
				echo $_SESSION['lang']['dataposted'];
			}
		}
		
	}
	
}

?>