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

//untuk ambil kode transaksi invoice in
$slcode="select kode from setup_5parameter where flag='tagihan'";
$rescode=$eksi->sSQL($slcode);
foreach($rescode as $barcode){
	$kodetr=$barcode['kode'];
}

//ambil kode PO
$slpo="select kode from  setup_5parameter where flag='dokpo'";
$respo=$eksi->sSQL($slpo);
foreach($respo as $barpo){
	$dokpo=$barpo['kode'];
}
//ambil kode SPK
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
//ambil kode CIP
$slcip="select kode from  setup_5parameter where flag='dokcip'";
$rescip=$eksi->sSQL($slcip);
foreach($rescip as $barcip){
	$dokcip=$barcip['kode'];
}
//ambil kode Lain2
$slln="select kode from  setup_5parameter where flag='dokln'";
$resln=$eksi->sSQL($slln);
foreach($resln as $barln){
	$dokln=$barln['kode'];
}

//ambil kode pib po
$slpibpo="select kode from setup_5parameter where flag='dokpibpo'";
$respibpo=$eksi->sSQL($slpibpo);
foreach($respibpo as $barpibpo){
	$dokpibpo=$barpibpo['kode'];
}

//ambil kode FIN
$slfin="select kode from setup_5parameter where flag='kodefin'";
$resfin=$eksi->sSQL($slfin);
foreach($resfin as $barfin){
	$kodefin=$barfin['kode'];
}

//cari status posting di setup_5parameter ==Jo 09-02-2017==
$slstatus="select kode from setup_5parameter where flag='statuspost' order by kode asc";
$resstatus=$eksi->sSQL($slstatus);
foreach($resstatus as $barstatus){
	$statpost=$barstatus['kode'];
}



switch(true)
{
	//untuk cari akun  vendor == Jo 04-05-2017==
	case ($method=='ListVendor'):
		$textsearch=$_POST['textsearch'];
		$String = "SELECT supplierid,namasupplier FROM ".$dbname.".log_5supplier
		WHERE (supplierid like '%".$textsearch."%'
		OR namasupplier like '%".$textsearch."%') ";
		$resvendor=$eksi->sSQL($String);
		#pre($ListNoAkun);exit();
		$stream ="<table border=1>";
		$stream.="<thead><tr>";
		$stream.="<td>Nama Vendor</td>";
		$stream.="</tr>";
		$stream.="</thead><tbody>";
		$No = 1;
		foreach($resvendor as $barvendor){
			$stream.="<tr class=rowcontent style='cursor:pointer;' title='Click It' onclick=SetVendor('".$No."')>";
			$stream.="<input type='hidden' id='novendorsrch".$No."' value='".$barvendor['supplierid']."'>";
			$stream.="<td>".$barvendor['namasupplier']."</td>";
			$stream.="<input type='hidden' id='namavendorsrch".$No."' value='".$barvendor['namasupplier']."'>";
			$stream.="</tr>";
			$No++;
		}
		$stream.="</tbody></table>";
		echo $stream;

	break;
	
	case ($method=='checkinv'):
		$noinv=$_POST['noinv'];
		$slinv="select noinvoice from keu_trx_ht where noinvoice='".$noinv."'";
		$juminv=$eksi->sSQLnum($slinv);
		echo $juminv;

	break;
	
	case ($method=='hitungJatuhTempo'):
		$tgltrm=$_POST['tgltrm'];
		$hrjtm=$_POST['hrjtm'];
		$tgjtm=date('d-m-Y', strtotime($tgltrm. " + ".$hrjtm." days"));
		echo $tgjtm;

	break;
	
	case ($method=='getNPWP'):
		$slnpwp=$eksi->sSQL("select npwp from log_5supplier where supplierid='".$vendor."'");
		foreach($slnpwp as $barnpwp){
			$npwp=$barnpwp['npwp'];
		}
		if ($npwp=='')
		{
			echo "";
		}	
		else {
			echo $npwp;
		}
	break;	
	
	case ($method=='getTrans'):
		$vendor=$_POST['pilihvendor'];
		$opttrans="<option value=''></option>";
		$po=0;//untuk tentukan pilih dok PO atau bukan (1/0)
		$ln=0;
		$vendor=$_POST['pilihvendor'];
		switch ($dok){
			case $dokcip:
				//$trans=$eksi->sSQL("SELECT nocip,keterangan FROM log_cipht where SUBSTRING_INDEX(nocip,'/',-1)='".$_SESSION['empl']['lokasitugas']."' and ifnull(isPosting,0)=0 ORDER BY tanggal DESC");
				//rubah jadi lihat kode pusat ==Jo 19-05-2017==
				$trans=$eksi->sSQL("SELECT nocip,keterangan FROM log_cipht where SUBSTRING_INDEX(nocip,'/',-1) like '".$_SESSION['empl']['kodeorganisasi']."%' and ifnull(isPosting,0)=0 ORDER BY tanggal DESC");
				
				foreach($trans as $bartrans){
					$opttrans.="<option value=".$bartrans['nocip'].">".$bartrans['nocip']." - ".$bartrans['keterangan']."</option>";
				}
			break;
			
			case $dokpo:
				//$trans=$eksi->sSQL("SELECT nopo FROM log_poht where stat_release=1 ".$pusat." ORDER BY tanggal DESC"); 
				
				//tambah filter vendor ==JO 04-05-03-2017==
				if($vendor==''){
					$wherevn="";
				}
				else{
					$wherevn="and a.kodesupplier='".$vendor."'";
				}
				$slhoso="select nama from setup_5parameter where flag='hoso' and kode ='".$_SESSION['empl']['pusat']."'";
				$reshoso=$eksi->sSQL($slhoso);
				foreach($reshoso as $barhoso){
					$hosos=$barhoso['nama'];
				}
				
				if($_SESSION['empl']['pusat']==1){
					$whrhs="";
				}
				else{
					$whrhs="and a.nocounter LIKE '%".$hosos."'";
				}
				
				$str="select a.nopo, a.nocounter
						from log_poht a
						inner join log_podt b ON a.nopo=b.nopo
						inner join log_prapodt c ON b.nopp =c.nopp AND b.kodebarang=c.kodebarang
						WHERE a.stat_release=1 AND a.kodeorg='".$_SESSION['empl']['kodeorganisasi']."'  
						".$whrhs."
						".$wherevn." group by a.nopo";
				//echo "warning: ".$str;
				$trans=$eksi->sSQL($str);
				foreach($trans as $bartrans){
					//tambahkan untuk cek apakah po sudah dibayar lunas atau belum ==Jo 02-05-2017==
					$slheader="select nilaidiskon from log_poht where nopo='".$bartrans['nopo']."'";
					$reshd=$eksi->sSQL($slheader);
					foreach($reshd as $barhd){
						$nldiskon=$barhd['nilaidiskon'];
					}
					$str="select sum(jumlahpesan*hargasatuan) as nilai from log_podt where nopo = '".$bartrans['nopo']."'";
					$totalnilai=0;
					$res= $eksi->sSQL($str);
					foreach($res as $bar) {
						$totalnilaiawal=$bar['nilai'];
					}
					$totalpo=$totalnilaiawal-$nldiskon;
					
					//tambah nilai invoice po yang sudah dibayar  sebelumnya ==Jo 21-03-2017==
					$totalsbl=0;
					$slsblm="select sum(nett) as nett from keu_trx_ht where nodokumen='".$bartrans['nopo']."' and status=".$statpost."";
					$ressblm=$eksi->sSQL($slsblm);
					foreach($ressblm as $barsblm){
						$totalsbl=$barsblm['nett'];
					}
					
					$totalnilai=$totalpo-$totalsbl;
					if($totalnilai>0){
						$opttrans.="<option value=".$bartrans['nopo'].">".$bartrans['nocounter']."</option>";
					}
					
				}
				$po=1;
			break;
			
			case $dokpibpo:
				//tambah filter vendor ==JO 04-05-03-2017==
				if($vendor==''){
					$wherevn="";
				}
				else{
					$wherevn="and a.kodesupplier='".$vendor."'";
				}
				//untuk no po baru ==Jo 17-05-2017==
				$str="select a.nopo
						from log_poht a
						inner join log_podt b ON a.nopo=b.nopo
						inner join log_prapodt c ON b.nopp =c.nopp AND b.kodebarang=c.kodebarang
						WHERE a.stat_release=1 AND c.nopp LIKE '%".$_SESSION['empl']['lokasitugas']."' 
						and  pib>0 ".$wherevn." group by a.nopo";
				$trans=$eksi->sSQL($str);

				foreach($trans as $bartrans){
					//tambah filter agar pib yang sudah dibayar tidak muncul di list lagi ==Jo 03-05-2017==
					$slppo="select nodokumen,rmnamt from keu_trx_ht where sumberdokumen=".$dokpibpo." and nodokumen='".$bartrans['nopo']."'";
					$jumdt=$eksi->sSQLnum($slppo);
					if($jumdt==0){
						$opttrans.="<option value=".$bartrans['nopo'].">".$bartrans['nopo']."</option>";
					}
					else {
						$respo=$eksi->sSQL($slppo);
						foreach($respo as $barpo){
							if($barpo['rmnamt']>0){
								$opttrans.="<option value=".$bartrans['nopo'].">".$bartrans['nopo']."</option>";
							}
						}
					}
					
				}
			break;
			
			case $dokspk: //tambah filter harus ba spk nya blm pernah dibuat invoice ==JO 16-03-2017==
				//tambah filter lokasitugas ==Jo 05-06-2017==
				if($_SESSION['empl']['pusat']==1){
					$wherephk="and kodeorg like '".$_SESSION['empl']['kodeorganisasi']."%'";
				}
				else{
					$wherephk="and kodeorg='".$_SESSION['empl']['lokasitugas']."'";
				}
				
				//tambah filter vendor ==JO 04-05-03-2017==
				if($vendor==''){
					$wherevn="";
				}
				else{
					$wherevn="and pihak2='".$vendor."'";
				}
				
				$str="SELECT nospk FROM log_spkht_new  where stat_release=1 and complete=0 and nospk not in (select b.spk from keu_trx_ht a left join log_spk_ba b on  a.nodokumen=b.id  where a.sumberdokumen=".$dokbaspk." group by b.spk) ".$wherevn." ".$wherephk." ORDER BY nospk DESC";
				$trans=$eksi->sSQL($str); //where stat_release=1
				foreach($trans as $bartrans){
					$opttrans.="<option value=".$bartrans['nospk'].">".$bartrans['nospk']."</option>";
				}
			break;
			
			case $dokbaspk:
				//tambah filter lokasitugas ==Jo 05-06-2017==
				if($_SESSION['empl']['pusat']==1){
					$wherephk="and b.kodeorg like '".$_SESSION['empl']['kodeorganisasi']."%'";
				}
				else{
					$wherephk="and b.kodeorg='".$_SESSION['empl']['lokasitugas']."'";
				}
			
				//tambah filter vendor ==JO 04-05-03-2017==
				if($vendor==''){
					$wherevn="";
				}
				else{
					$wherevn="and b.pihak2='".$vendor."'";
				}
				$str="SELECT a.id,a.spk,a.namaba FROM log_spk_ba  a left join log_spkht_new b on a.spk=b.nospk where b.stat_release=1 and b.complete=0 and a.posting=1 ".$wherevn." ".$wherephk."  order by a.id ASC";
				$trans=$eksi->sSQL($str); //where stat_release=1
				foreach($trans as $bartrans){
					$opttrans.="<option value=".$bartrans['id'].">".$bartrans['spk']." - ".$bartrans['namaba']."</option>";
				}
			break;
			case $dokln:
				//fixing sesuaikan kode kegiatan dengan setup_5parameter ==Jo 27-03-2017==
				$trans=$eksi->sSQL("select a.noakun,a.namakegiatan from setup_kegiatan a left join setup_klpkegiatan b on a.kelompok=b.kodeklp where b.act='".$kodefin."' order by a.namakegiatan"); //where stat_release=1
				foreach($trans as $bartrans){
					$opttrans.="<option value=".$bartrans['noakun'].">".$bartrans['namakegiatan']."</option>";
				}
				$ln=1;
			break;
					
			default:
			break;
			
		}
		
		echo $opttrans."###".$po."###".$ln;

	break;
	
	case ($method=='getBank'):
		$optbank="<option value=''></option>";
		$bank=$eksi->sSQL("SELECT idbanksupplier,kodebank,atasnama,norekening FROM log_banksupplier where kodesupplier= '".$vendor."' ORDER BY kodebank ASC");
		foreach($bank as $barbank){
			$optbank.="<option value=".$barbank['idbanksupplier'].">".$barbank['kodebank']." (".$barbank['norekening']." - a/n ".$barbank['atasnama'].")</option>";
		}
		echo $optbank;

	break;
	
	case ($method=='getKodeBank'):
		$str="select kodebank, norekening from log_banksupplier where idbanksupplier='".$bank."'";
		$slbank=$eksi->sSQL($str);
		foreach($slbank as $barbank){
			$kodebank=$barbank['kodebank'];
			$norekening=$barbank['norekening'];
		}
		/*if ($kodebank=='')
		{
			echo ""."###"."";
		}	
		else {
			echo $kodebank."###".$norekening;
		}*/
		echo $kodebank."###".$norekening;
	break;
		
	case ($method=='getDefaultKurs'):
		$matauang=$_POST['matauang'];
		$slmtuang=$eksi->sSQL("SELECT `default` FROM setup_matauang where kode='".$matauang."'");
		foreach($slmtuang as $barmtuang){
			$default=$barmtuang['default'];
		}
		echo $default;
	break;
	
	
	case ($method=='getVendor') :
		$transno=$_POST['transno'];
		$dok=$_POST['dok'];
		//tambah supaya spk dan ba spk juga otomatis memunculkan vendor ==Jo 03-05-2017==
		if($dok==$dokpo || $dok==$dokpibpo){
			$slvendor="select kodesupplier from log_poht where nopo='".$transno."'";
			$resvendor=$eksi->sSQL($slvendor);
			foreach($resvendor as $barvendor){
				$vendorid=$barvendor['kodesupplier'];
			}
		}
		else if($dok==$dokspk){
			$slvendor="select pihak2 from log_spkht_new where nospk='".$transno."'";
			$resvendor=$eksi->sSQL($slvendor);
			foreach($resvendor as $barvendor){
				$vendorid=$barvendor['pihak2'];
			}
		}
		else if ($dok==$dokbaspk){
			$slvendor="select a.pihak2 from log_spkht_new a 
			left join log_spk_ba b on a.nospk=b.spk
			where b.id='".$transno."'";
			$resvendor=$eksi->sSQL($slvendor);
			foreach($resvendor as $barvendor){
				$vendorid=$barvendor['pihak2'];
			}
		}
		
		//tambah untuk nama vendor ==Jo 04-05-2017==
		$slnama="select namasupplier from log_5supplier where supplierid='".$vendorid."'";
		$resnama=$eksi->sSQL($slnama);
		foreach($resnama as $barnama){
			$namavendor=$barnama['namasupplier'];
		}
		
		echo $vendorid."###".$namavendor;
	break;
	
	case ($method=='insertHeader'|| $method=='updateHeader'):
		//update sesuai field yang ditambah atau dikurangi ==Jo 05-05-2017==
		$nocounter=$_POST['nocounter'];//untuk update
		$noinv=$_POST['noinv'];
		$tanggalinv=$_POST['tanggalinv'];
		$tanggalinvtr=$_POST['tanggalinvtr'];
		$hrjatuhtmp=$_POST['hrjatuhtmp'];
		$tgljatuhtempo=$_POST['tgljatuhtempo'];
		$pilihvendor=$_POST['pilihvendor'];
		//$pilihbank=$_POST['pilihbank'];
		$ftpajak=$_POST['ftpajak'];
		$tanggalft=$_POST['tanggalft'];
		$pilihmtuang=$_POST['pilihmtuang'];
		$kurs=$_POST['kurs'];
		//$pilihpmb=$_POST['pilihpmb'];
		$pilihtipe=$_POST['pilihtipe'];
		$pilihdok=$_POST['pilihdok'];
		$pilihtrans=$_POST['pilihtrans'];
		$keterangan=$_POST['keterangan'];
		//tambah dp dan retensi untuk spk ==Jo 30-05-2017==
		$totaldp=$_POST['totaldp'];
		$sisadp=$_POST['sisadp'];
		$alkdp=$_POST['alkdp'];
		$totalrtn=$_POST['totalrtn'];
		$sisartn=$_POST['sisartn'];
		$alkrtn=$_POST['alkrtn'];
		
		$total=$_POST['total'];
		$diskon=$_POST['diskon'];
		$selisih=$_POST['selisih'];
		$nett=$_POST['nett'];
		$kodeppn=$_POST['kodeppn'];
		$persenppn=$_POST['persenppn'];
		$nilaippn=$_POST['nilaippn'];
		$kodepph=$_POST['kodepph'];
		$persenpph=$_POST['persenpph'];
		$nilaipph=$_POST['nilaipph'];
		$kodepbbkb=$_POST['kodepbbkb'];
		$persenpbbkb=$_POST['persenpbbkb'];
		$nilaipbbkb=$_POST['nilaipbbkb'];
		$subtotal=$_POST['subtotal'];
		$penambah=$_POST['penambah'];
		$pengurang=$_POST['pengurang'];
		$grandtotal=$_POST['grandtotal'];
		$pilihcoa=$_POST['pilihcoa'];
		
		//untuk format nocounter insert ==dipindah ke sini mencegah bentrok nocounter saat input bersamaan
		$nocounterfirst=$_SESSION['empl']['kodeorganisasi']."/".$_SESSION['empl']['lokasitugas']."/".$kodetr."/";
		if ($eksi->sSQLnum("select nocounter from keu_trx_ht where trxtype=".$kodetr." order by CONVERT(substr(nocounter,length(nocounter)-2,length(nocounter)),UNSIGNED INTEGER) desc limit 1")>0){
			$counter=$eksi->sSQL("select nocounter from keu_trx_ht where trxtype=".$kodetr." order by CONVERT(substr(nocounter,length(nocounter)-2,length(nocounter)),UNSIGNED INTEGER) desc limit 1");
			foreach($counter as $barcounter){
				$angka=$barcounter['nocounter'];
			}
			$angkas=intval(substr($angka,strlen($angka)-3,strlen($angka)))+1;
			if($angkas<10){
				$angkacount="00".$angkas;
			}
			else if($angkas<100) {
				$angkacount="0".$angkas;
			}
			else {
				$angkacount=$angkas;
			}
		}
		else {
			$angkacount="001";
		}

		$nocounterlast=substr(date('Y'),strlen(date('Y'))-2,strlen(date('Y')));
		$nocounterlast.=date('m');
		$nocounterlast.=$angkacount;
		$nocounterins=$nocounterfirst.$pilihtipe."/".$nocounterlast;
		
		$bayaridr=0;
		//ambil mata uang yang merupakan default ==Jo 20-03-2017==
		$slmtuang="select kode from setup_matauang where `default`=1";
		$resmtuang=$eksi->sSQL($slmtuang);
		foreach($resmtuang as $barmtuang){
			$mtuangdf=$barmtuang['kode'];
		}
		
		if($pilihmtuang==$mtuangdf){
			$bayaridr=$grandtotal;
		}
		else{
			$bayaridr=$grandtotal*$kurs;
		}
		
		$data=array("nocounter"=>"'".$nocounterins."'",
					  "kodeorganisasi"=>"'".$_SESSION['empl']['kodeorganisasi']."'",
					  "lokasitugas"=>"'".$_SESSION['empl']['lokasitugas']."'",
					  "kodedepartemen"=>"'".$_SESSION['empl']['bagian']."'",
					  "trxtype"=>"100",
					  "strxtype"=>"".$pilihtipe."",
					  "noinvoice"=>"'".$noinv."'",
					  "tanggalinvoice"=>"'".date('Y-m-d', strtotime($tanggalinv))."'",
					  "tanggalinvterima"=>"'".date('Y-m-d', strtotime($tanggalinvtr))."'",
					  "hrjatuhtempo"=>"".$hrjatuhtmp."",
					  "tgljatuhtempo"=>"'".date('Y-m-d', strtotime($tgljatuhtempo))."'",
					  "custsupplier"=>"'".$pilihvendor."'",
					  "fakturpajak"=>"'".$ftpajak."'",
					  "tanggalfakturpajak"=>"'".date('Y-m-d', strtotime($tanggalft))."'",
					  "kodematauang"=>"'".$pilihmtuang."'",
					  "kurs"=>"".$kurs."",
					  "sumberdokumen"=>"'".$pilihdok."'",
					  "nodokumen"=>"'".$pilihtrans."'",
					  "keterangan"=>"'".$keterangan."'",
					  "totaldp"=>"".$totaldp."",
					  "sisadp"=>"".$sisadp."",
					  "alokasidp"=>"".$alkdp."",
					  "totalretensi"=>"".$totalrtn."",
					  "sisaretensi"=>"".$sisartn."",
					  "alokasiretensi"=>"".$alkrtn."",
					  "total"=>"".$total."",
					  "rmnamt"=>"".$grandtotal."",
					  "rmnamtidr"=>"".$bayaridr."",
					  "diskon"=>"".$diskon."",
					  "selisih"=>"".$selisih."",
					  "nett"=>"".$nett."",
					  "kodeppn"=>"'".$kodeppn."'",
					  "persenppn"=>"".$persenppn."",
					  "nilaippn"=>"".$nilaippn."", 
					  "kodepph"=>"'".$kodepph."'",
					  "persenpph"=>"".$persenpph."",
					  "nilaipph"=>"".$nilaipph."", 
					  "kodepbbkb"=>"'".$kodepbbkb."'",
					  "persenpbbkb"=>"".$persenpbbkb."",
					  "nilaipbbkb"=>"".$nilaipbbkb."",
					  "subtotal"=>"".$subtotal."",
					  "penambah"=>"".$penambah."",
					  "pengurang"=>"".$pengurang."",
					  "grandtotal"=>"".$grandtotal."",
					  "grandtotalidr"=>"".$bayaridr."",
					  "coa"=>"'".$pilihcoa."'",
					  "createby"=>"'".$_SESSION['standard']['userid']."'",					  
					  "createtime"=>"'". date('Y-m-d H:i:s')."'");
		
		$updates=array("nocounter"=>"'".$nocounterins."'",
					  "kodeorganisasi"=>"'".$_SESSION['empl']['kodeorganisasi']."'",
					  "lokasitugas"=>"'".$_SESSION['empl']['lokasitugas']."'",
					  "kodedepartemen"=>"'".$_SESSION['empl']['bagian']."'",
					  "trxtype"=>"100",
					  "strxtype"=>"".$pilihtipe."",
					  "noinvoice"=>"'".$noinv."'",
					  "tanggalinvoice"=>"'".date('Y-m-d', strtotime($tanggalinv))."'",
					  "tanggalinvterima"=>"'".date('Y-m-d', strtotime($tanggalinvtr))."'",
					  "hrjatuhtempo"=>"".$hrjatuhtmp."",
					  "tgljatuhtempo"=>"'".date('Y-m-d', strtotime($tgljatuhtempo))."'",
					  "custsupplier"=>"'".$pilihvendor."'",
					  "fakturpajak"=>"'".$ftpajak."'",
					  "tanggalfakturpajak"=>"'".date('Y-m-d', strtotime($tanggalft))."'",
					  "kodematauang"=>"'".$pilihmtuang."'",
					  "kurs"=>"".$kurs."",
					  "sumberdokumen"=>"'".$pilihdok."'",
					  "nodokumen"=>"'".$pilihtrans."'",
					  "keterangan"=>"'".$keterangan."'",
					  "totaldp"=>"".$totaldp."",
					  "sisadp"=>"".$sisadp."",
					  "alokasidp"=>"".$alkdp."",
					  "totalretensi"=>"".$totalrtn."",
					  "sisaretensi"=>"".$sisartn."",
					  "alokasiretensi"=>"".$alkrtn."",
					  "total"=>"".$total."",
					  "rmnamt"=>"".$grandtotal."",
					  "rmnamtidr"=>"".$bayaridr."",
					  "diskon"=>"".$diskon."",
					  "selisih"=>"".$selisih."",
					  "nett"=>"".$nett."",
					  "kodeppn"=>"'".$kodeppn."'",
					  "persenppn"=>"".$persenppn."",
					  "nilaippn"=>"".$nilaippn."", 
					  "kodepph"=>"'".$kodepph."'",
					  "persenpph"=>"".$persenpph."",
					  "nilaipph"=>"".$nilaipph."", 
					  "kodepbbkb"=>"'".$kodepbbkb."'",
					  "persenpbbkb"=>"".$persenpbbkb."",
					  "nilaipbbkb"=>"".$nilaipbbkb."",
					  "subtotal"=>"".$subtotal."",
					  "penambah"=>"".$penambah."",
					  "pengurang"=>"".$pengurang."",
					  "grandtotal"=>"".$grandtotal."",
					  "grandtotalidr"=>"".$bayaridr."",
					  "coa"=>"'".$pilihcoa."'",
					  "updateby"=>"'".$_SESSION['standard']['userid']."'");
		
		if ($method=='insertHeader'){
			$string=$eksi->genSQL('keu_trx_ht',$data,false);
		}else
		{
			$string=$eksi->genSQL('keu_trx_ht',$updates,true)." 
			WHERE  nocounter='".$nocounter."'";
			$sldok="select sumberdokumen,nodokumen from keu_trx_ht where nocounter='".$nocounter."'";
			$resdok=$eksi->sSQL($sldok);
			foreach($resdok as $bardok){
				$sumdok=$bardok['sumberdokumen'];
				$nodok=$bardok['nodokumen'];
			}
			//$eksi->hapus('keu_trx_dt'," WHERE nocounter='".$nocounter."'");
		}
		//echo "warning: ".$string;exit();
		$hasil=$eksi->exc($string);
		
		if(!$hasil){
			  echo $_SESSION['lang']['simpangagal'];
		}else {
			  if ($method=='insertHeader'){
					echo $_SESSION['lang']['alertinsert1']."|".$noinv."|1|".$nocounterins;	
			  }else{
				if($sumdok==$pilihdok && $nodok==$pilihtrans){
					echo $_SESSION['lang']['alertupdate']."|".$noinv."|0|".$nocounter;
				}
				else {
					$eksi->hapus('keu_trx_dt'," WHERE nocounter='".$nocounter."'");
					echo $_SESSION['lang']['alertupdate']."|".$noinv."|1|".$nocounter;
				}
					
			  }
		}	
	break;
	
	case ($method=='insertDetail') :
		$kobar=Array();
		$kobar=json_decode($_POST['kobar']);
		$nabar=Array();
		$nabar=json_decode($_POST['nabar']);
		$jmbar=Array();
		$jmbar=json_decode($_POST['jmbar']);		
		$satuan=Array();
		$satuan=json_decode($_POST['satuan']);		
		$harga=Array();
		$harga=json_decode($_POST['harga']);		
		$nilai=Array();
		$nilai=json_decode($_POST['nilai']);
		$nomax=$_POST['nomax'];
		$nocounter=$_POST['nocounter'];
		$string='';
		$berhasil=0;
		for($i=1;$i<=$nomax;$i++){
			$data=array("nocounter"=>"'".$nocounter."'",
					  "seqno"=>"".$i."",
					  "kode"=>"'".$kobar[$i]."'",
					  "namabarang"=>"'".$nabar[$i]."'",
					  "jumlah"=>"".$jmbar[$i]."",
					  "satuan"=>"'".$satuan[$i]."'",
					  "harga"=>"".str_replace(".","",str_replace(",00","",$harga[$i]))."",
					  "total"=>"".str_replace(".","",str_replace(",00",".",$nilai[$i]).""));
			if ($method=='insertDetail'){
				$string=$eksi->genSQL('keu_trx_dt',$data,false);
			}else
			{
				$string=$eksi->genSQL('keu_trx_dt',$data,true)." 
				WHERE  nocounter='".$nocounter."' AND seqno=".$seqno;
			}
			//echo "warning: ".$string;
			$hasil=$eksi->exc($string);
			if($hasil){
				$berhasil++;
			}else {
				
			}
		
		}
		if($berhasil==$nomax){
			if ($method=='insertDetail'){
				echo $_SESSION['lang']['alertinsert1']."|".$nocounter."|".$seqno;	
			}else{
				echo $_SESSION['lang']['alertupdate']."|".$nocounter."|".$seqno;
			} 
		}else {
			echo $_SESSION['lang']['simpangagal'];
			
		}
		
		
	break;
	
	case ($method=='showPO'):
		$limit=10;
		$page=0;
		if(isset($_POST['page'])){
		$page=$_POST['page'];
		if($page<0)
		$page=0;
		}
		$offset=$page*$limit;	
		//$filter = "";
		//$filter="AND a.notransaksi='".$_POST['filter']."' AND a.tugaskma='".$_POST['keyword']."'";
		
		$str="select a.kodebarang, a.jumlahpesan, a.satuan, a.hargasatuan, (a.jumlahpesan*a.hargasatuan) as nilai, b.namabarang from log_podt a left join log_5masterbarang b on a.kodebarang=b.kodebarang where a.nopo = '".$transno."'
		order by a.nopo desc limit ".$offset.",".$limit." ";
		$sql="select kodebarang from log_podt where nopo='".$transno."' order by nopo desc";
		$res= $eksi->sSQL($str);
		$jlhbrs = 0;
		$no=($page*$limit);
		
		$jlhbrs= $eksi->sSQLnum($sql);
		
		if (count($res)>0){
			foreach($res as $bar) {
				$no+=1;
				echo"<tr class=rowcontent>
					  <td>".$no."</td>
					  <td id=kdbrg".$no.">".$bar['kodebarang']."</td>
					  <td id=nmbrg".$no.">".$bar['namabarang']."</td>
					  <td id=jmbrg".$no.">".$bar['jumlahpesan']."</td>
					  <td id=satuan".$no.">".$bar['satuan']."</td>
					  <td id=harga".$no.">".number_format($bar['hargasatuan'],2,',','.')."</td>
					  <td id=nilai".$no.">".number_format($bar['nilai'],2,',','.')."</td>
					  
					 </tr>";
			}	

				
		}
		echo "<tr class='footercolor'>
				<td colspan=7 align=center>
				".(($page*$limit)+1)." to ".(($page+1)*$limit)." Of ".  $jlhbrs."
				<br />
				<button class=mybutton onclick=cariBast(".($page-1).");>".$_SESSION['lang']['pref']."</button>
				<button class=mybutton onclick=cariBast(".($page+1).");>".$_SESSION['lang']['lanjut']."</button>
				<input type=hidden id=nomax value=".$no."></input>
				</td>
				</tr>";
		break;
		
	case ($method=='getTotal'):
		
		switch($dok){
			case $dokpo:
			$slheader="select nilaidiskon, nilaipo, matauang, kurs from log_poht where nopo='".$transno."'";
			$reshd=$eksi->sSQL($slheader);
			foreach($reshd as $barhd){
				$nldiskon=$barhd['nilaidiskon'];
				$nlpo=$barhd['nilaipo'];
				$nlpo=$barhd['nilaipo'];
				$mtuang=$barhd['matauang'];
				$kurss=$barhd['kurs'];
			}
			$str="select (a.jumlahpesan*a.hargasatuan) as nilai, b.isBBM from log_podt a
			left join log_5masterbarang b on a.kodebarang=b.kodebarang where a.nopo = '".$transno."'";
			$totalnilai=0;
			$res= $eksi->sSQL($str);
			foreach($res as $bar) {
				$isBBM=$bar['isBBM'];
				$totalnilaiawal+=$bar['nilai'];
			}
			//$totalpo=$totalnilaiawal-$nldiskon;
			//ganti karena di log_podt katanya sudah diskon ==Jo 27-05-2017==
			//tambah kondisi untuk solar langsung nilai total tanpa split ppn, pph ==Jo 30-05-2017==
			if($isBBM==1){
				$totalpo=$nlpo;
			}
			else{
				$totalpo=$totalnilaiawal;
			}
			
			
			$persenppn=0;
			$persenpph=0;
			$persenpbbkb=0;
			$slheader="select ppn,pph,pbbkb from log_poht where nopo='".$transno."'";
			$resheader=$eksi->sSQL($slheader);
			foreach($resheader as $barheader){
				if($isBBM==1){
					$persenppn=0;
					$persenpph=0;
					$persenpbbkb=0;
				}
				else{
					$persenppn=$barheader['ppn'];
					$persenpph=$barheader['pph'];
					$persenpbbkb=$barheader['pbbkb'];
				}
				
			}
			//tambah nilai invoice po yang sudah dibayar  sebelumnya ==Jo 21-03-2017==
			$totalsbl=0;
			$slsblm="select sum(nett) as nett from keu_trx_ht where nodokumen='".$transno."' and status=".$statpost."";
			$ressblm=$eksi->sSQL($slsblm);
			foreach($ressblm as $barsblm){
				$totalsbl=$barsblm['nett'];
			}
			$totalnilai=$totalpo-$totalsbl;
			//echo "warning ".$slsblm;
			break;
			
			case $dokpibpo:
			$str="select pib from log_poht where nopo='".$transno."'";
			$res= $eksi->sSQL($str);
			foreach($res as $bar) {
				$totalnilai+=$bar['pib'];
			}
			break;
			
			case $dokspk:
			$str="select ((dppersen/100)*nilai) as nilaidps, ppnpersen, pphpersen, nilaidp,nilairtn, mu from log_spkht_new where stat_release=1 and complete=0 and nospk='".$transno."'";
			$totalnilai=0;
			$res= $eksi->sSQL($str);
			foreach($res as $bar) {
				$totalnilai=$bar['nilaidps'];
				$persenppn=$bar['ppnpersen'];
				$persenpph=$bar['pphpersen'];
				$nilaidp=$bar['nilaidp'];
				$nilairtn=$bar['nilairtn'];
				$mtuang=$bar['mu'];
			}
			break;	
			
			case $dokbaspk:
			$str="select nominaldpp,ppn,pph,spk from log_spk_ba where id='".$transno."'";
			$totalnilai=0;
			$res= $eksi->sSQL($str);
			foreach($res as $bar) {
				$nilaibaspk=$bar['nominaldpp'];
				$persenppn=$bar['ppn'];
				$persenpph=$bar['pph'];
				$nospk=$bar['spk'];
			}
			
			$strspk="select nilai,nilaidp,nilairtn,mu from log_spkht_new where nospk='".$nospk."'";
			$resspk= $eksi->sSQL($strspk);
			foreach($resspk as $barspk) {
				$totalspk=$barspk['nilai'];
				$nilaidp=$barspk['nilaidp'];
				$nilairtn=$barspk['nilairtn'];
				$mtuang=$barspk['mu'];
			}
			
			$idbaspk="";
			$slbaspk="select id from log_spk_ba where spk='".$nospk."' and posting=1";
			$resbaspk=$eksi->sSQL($slbaspk);
			foreach($resbaspk as $barbaspk){
				$idbaspk.="'".$barbaspk['id']."',";
			}
			
			$idbaspks=substr($idbaspk,0,strlen($idbaspk)-1);
			//cari invoice sebelumnya
			$slfirst="SELECT 'invc' jenis, (nett+selisih) as nett, updatetime FROM keu_trx_ht where nodokumen in('".$nospk."',".$idbaspks.") and status=3 
			union all
			SELECT 'ba' jenis, nominaldpp, updated from log_spk_ba
			where posting=1 and spk= '".$nospk."' having (nominaldpp and updated) <> '' 
			order by updatetime,jenis;";
			$ttlfirst=$eksi->sSQLnum($slfirst);
			//echo "warning: ".$slfirst;exit();
			$resfirst=$eksi->sSQL($slfirst);
			$firstdt=Array();
			$idx=0;
			$totalinvc=Array();
			$totalba=Array();
			$totalbas=0;
			$totalinvcs=0;
			foreach($resfirst as $barfirst){
				$firstdt[$idx]=$barfirst['jenis'];
				if ($firstdt[$idx]=='invc'){
					$totalinvc[$idx]=$barfirst['nett'];
					$totalinvcs+=$barfirst['nett'];
				}
				if ($firstdt[$idx]=='ba'){
					$totalba[$idx]=$barfirst['nett'];
					$totalbas+=$barfirst['nett'];
				}
				$idx++;
			}
			if($ttlfirst>0 && $firstdt[$idx-1]=='ba'){
				//$totalnilai=($totalbas)-$totalinvcs;
				if($totalbas<$totalinvcs){
					$totalnilai=0;
				}
				else{
					$totalnilai=($totalbas)-$totalinvcs;
				}
			}
			//lepas dulu jagaan siapa posting duluan ==JO 25-05-2017==
			//tambah kondisi kalau nilai ba lebih kecil dari remaining DP ==Jo 25-05-2017==
			/*if($totalbas<$totalinvcs){
				$totalnilai=0;
			}
			else{
				$totalnilai=($totalbas)-$totalinvcs;
			}*/
			
			break;	
				
			case $dokcip:
			/*$str="select sum(ifnull(jumlah,1)*ifnull(hargasatuan,1)) as hargatotal from log_cipdt where nocip='".$transno."'";
			$totalnilai=0;
			$res= $eksi->sSQL($str);
			foreach($res as $bar) {
				$totalnilai=$bar['hargatotal'];
			}*/
			//rubah jadi tidak tarik nilai cip ==Jo 20-03-2017==
			break;
			
			default:
			break;
		
		}
		
		echo $totalnilai."|".$persenppn."|".$persenpph."|".$persenpbbkb."|".$nilaidp."|".$nilairtn."|".$mtuang."|".$kurss;
		break;
		
	case ($method=='getKegPIB'):
		//ambil kode PIB
		$slpib="select kode from setup_5parameter where flag='kodepib'";
		$respib=$eksi->sSQL($slpib);
		foreach($respib as $barpib){
			$kodepib=$barpib['kode'];
		}
		$strcoa="select noakun,kodekegiatan,namakegiatan from setup_kegiatan where kodekegiatan='".$kodepib."' order by namakegiatan";
		$optCoa="<option value=''></option>";
		$rescoa=$eksi->sSQL($strcoa);
		foreach($rescoa as $barf){
		//$optCoa.="<option value='".$barf['kodekegiatan']."'>".$barf['kodekegiatan']."-".$barf['namakegiatan']."</option>";
		$optCoa.="<option value='".$barf['kodekegiatan']."'>".$barf['namakegiatan']."</option>";
		}
		echo $optCoa;
		break;
	
	case ($method=='getKegiatan'):
		//ambil kode FIN
		$slfin="select kode from setup_5parameter where flag='kodefin'";
		$resfin=$eksi->sSQL($slfin);
		foreach($resfin as $barfin){
			$kodefin=$barfin['kode'];
		}

		$optCoa="<option value=''></option>";
		//fixing sesuaikan kode kegiatan dengan seup_5parameter ==Jo 27-03-2017==
		$strcoa="select kodekegiatan,namakegiatan from setup_kegiatan a left join setup_klpkegiatan b on a.kelompok=b.kodeklp where b.act='".$kodefin."' order by namakegiatan";
		$rescoa=$eksi->sSQL($strcoa);
		foreach($rescoa as $barf){
			$optCoa.="<option value='".$barf['kodekegiatan']."'>".$barf['namakegiatan']."</option>";
		}

		$strkg="select kode,nama from setup_5parameter where flag='kgtfin'";
		$reskg=$eksi->sSQL($strkg);
		foreach($reskg as $barkg){
			$optCoa.="<option value='".$barkg['kode']."'>".$barkg['nama']."</option>";
		}
		echo $optCoa;
		break;
	
	case ($method=='showHeader'):
		
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
		$str="select a.tanggalinvterima, a.status, a.nocounter, b.namasupplier, a.noinvoice,a.sumberdokumen,a.nodokumen, a.keterangan, a.grandtotal, c.nama as namastatus, d.nama as smbdok from keu_trx_ht a left join log_5supplier b on a.custsupplier = b.supplierid
		left join setup_5parameter c on a.status = c.kode and c.flag='statuskeu'
		left join setup_5parameter d on a.sumberdokumen=d.kode and d.flag='sumberdok'
		where a.trxtype=".$kodetr." ".$filter." ".$loktug." 
		ORDER BY a.tanggalinvterima desc limit ".$offset.",".$limit." ";
		
		$sql=" select a.tanggalinvterima, a.status, a.nocounter, b.namasupplier, a.noinvoice, a.keterangan, a.grandtotal, c.nama as namastatus, d.nama as smbdok from keu_trx_ht a left join log_5supplier b on a.custsupplier = b.supplierid
		left join setup_5parameter c on a.status = c.kode and c.flag='statuskeu'
		left join setup_5parameter d on a.sumberdokumen=d.kode and d.flag='sumberdok'
		where a.trxtype=".$kodetr." ".$filter." ".$loktug." ORDER BY a.tanggalinvterima ";
		
		$res= $eksi->sSQL($str);
		$jlhbrs = 0;
		$no=($page*$limit);
		
		$jlhbrs= $eksi->sSQLnum($sql);
		
		foreach($res as $bar) {
			$no+=1;
			if($bar['sumberdokumen']==$dokln){
				$nodoks="-";
			}
			else if ($bar['sumberdokumen']==$dokpo){//untuk nopo baru ==Jo 17-05-2017==
				$slnoco="select nocounter from log_poht where nopo='".$bar['nodokumen']."'";
				$resnoco=$eksi->sSQL($slnoco);
				foreach($resnoco as $barnoco){
					$nodoks=$barnoco['nocounter'];
				}
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
					  <td>".$bar['noinvoice']."</td>
					  <td>".$bar['smbdok']."</td>
					  <td>".$nodoks."</td>
					  <td>".$bar['keterangan']."</td>
					  <td>".number_format($bar['grandtotal'],2,'.',',')."</td>
					  <td>".$_SESSION['lang'][$bar['namastatus']]."</td>
					  <td>";
						if ($bar['status']==0){
							echo "<img src=images/application/application_edit.png class=resicon  
							title='".$_SESSION['lang']['edit']."' 
							onclick=\"editHeader('".$bar['nocounter']."');\">
							
							<img src=images/application/application_delete.png class=resicon  
							title='".$_SESSION['lang']['delete']."' 
							onclick=\"delheader('".$bar['nocounter']."');\">";
					  
						}
					  echo 
					  "<img src=images/pdf.jpg class=resicon  title='Print Tagihan' onclick=\"masterPDF('keu_trx_ht','".$bar['nocounter']."','','keu_slave_tagihan_new_print',event);\">
					  <!--<img onclick=\"previewDetail('".$bar['nocounter']."','".$bar['noinvoice']."',event);\" title=\"Detail Tagihan\" class=\"resicon\" src=\"images/zoom.png\">-->  
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
	
	case ($method=='getDetail'):
		$rnocnt=$_POST['rnocnt'];
		echo"<div style='width:750px;overflow:scroll;'>
		<br/>";

		
		$str="select a.tanggalinvoice, a.status, a.nocounter, b.namasupplier, a.noinvoice,  a.sumberdokumen,  a.nodokumen, a.keterangan, a.total, a.diskon, a.nett, a.persenppn, a.nilaippn, a.persenpph, a.nilaipph, a.persenpbbkb, a.nilaipbbkb, a.penambah, a.pengurang, a.subtotal, a.grandtotal, a.selisih, a.coa, c.nama as namastatus, d.nama as smbdok from keu_trx_ht a 
		left join log_5supplier b on a.custsupplier = b.supplierid
		left join setup_5parameter c on a.status = c.kode and c.flag='statuskeu'
		left join setup_5parameter d on a.sumberdokumen=d.kode and d.flag='sumberdok'
		where a.nocounter='".$rnocnt."'";
		echo"
			<tbody>";
		$res=$eksi->sSQL($str);
		foreach($res as $bar){
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
			//header
			echo"<table>
			<tr>
				<td><span> ".$_SESSION['lang']['tanggal'].": </span></td>
				<td>".$bar['tanggalinvoice']."</td>
				<td><span >".$_SESSION['lang']['momordok'].": </span></td>
				<td>".$nodoks."</td>
			</tr>
			
			<tr>
				<td><span >".$_SESSION['lang']['vendor'].": </span></td>
				<td>".$bar['namasupplier']."</td>
				<td><span >".$_SESSION['lang']['keterangan'].": </span></td>
				<td>".$bar['keterangan']."</td>		
			</tr>
			
			<tr>
				<td><span>".$_SESSION['lang']['faktur'].": </span> </td>
				<td>".$bar['noinvoice']."</td>
				<td><span >".$_SESSION['lang']['grnd_total'].": </span></td>
				<td>".$bar['grandtotal']."</td>		
			</tr>	
				
			<tr>
				<td><span >".$_SESSION['lang']['sumberdok'].": </span></td>
				<td>".$bar['smbdok']."</td>
				<td><span >".$_SESSION['lang']['status'].": </span></td>
				<td>".$_SESSION['lang'][$bar['namastatus']]."</td>		
			</tr>
			</table>
			";
		
		echo"<br/><br/>";
		
			//detail
			echo "".$_SESSION['lang']['detailPembelian']."
			<br/>
			<table border=0 cellspacing=1 class=sortable width=auto>
			<thead>
			<tr style='align:center; color:#fff;'>
			<th>". $_SESSION['lang']['no']."</th>
			<th>".$_SESSION['lang']['kodebarang']."</th>
			<th>".$_SESSION['lang']['namabarang']."</th>
			<th>".$_SESSION['lang']['kuantitas']."</th>
			<th>".$_SESSION['lang']['satuan']."</th>
			<th>".$_SESSION['lang']['harga']."</th>
			<th>".$_SESSION['lang']['nilai']."</th>
			</tr>
			</thead>";
			$stdt="select kode,namabarang,jumlah,satuan,harga,total from keu_trx_dt where nocounter='".$rnocnt."'
			order by seqno asc";
			echo"
				<tbody>";
			$no=0;
			$totalakhir=0;
			$resdt=$eksi->sSQL($stdt);
			foreach($resdt as $bardt){
				$no+=1;
				$totalakhir+=$bardt['total'];
				echo"<tr class=rowcontent>	
					<td>".$no."</td>
					<td>".$bardt['kode']."</td>
					<td>".$bardt['namabarang']."</td>
					<td>".$bardt['jumlah']."</td>					
					<td>".$bardt['satuan']."</td>					
					<td>".number_format($bardt['harga'],2,',','.')."</td>					
					<td>".number_format($bardt['total'],2,',','.')."</td>					
					</tr>";
			}
			
			echo"<tr class=rowcontent>
			<td></td>
			<td>Total</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td>".number_format($totalakhir,2,',','.')."</td></tr>
			</tbody></table><br/><br/>";
			
			//summary
			echo"<table>
			<tr>
				<td><span> ".$_SESSION['lang']['total'].": </span></td>
				<td>".$bar['total']."</td>
				<td><span >".$_SESSION['lang']['pbbkb']."(".$bar['persenpbbkb']."%): </span></td>
				<td>".$bar['nilaipbbkb']."</td>
			</tr>
			
			<tr>
				<td><span >".$_SESSION['lang']['diskon'].": </span></td>
				<td>".$bar['diskon']."%</td>
				<td><span >".$_SESSION['lang']['subtotal'].": </span></td>
				<td>".$bar['subtotal']."</td>		
			</tr>
			
			<tr>
				<td><span>".$_SESSION['lang']['nett'].": </span> </td>
				<td>".$bar['nett']."</td>
				<td><span >".$_SESSION['lang']['additional'].": </span></td>
				<td>".$bar['penambah']."</td>		
			</tr>	
				
			<tr>
				<td><span >".$_SESSION['lang']['ppn']."(".$bar['persenppn']."%): </span></td>
				<td>".$bar['nilaippn']."</td>
				<td><span >".$_SESSION['lang']['pengurang'].": </span></td>
				<td>".$bar['pengurang']."</td>		
			</tr>
			<tr>
				<td><span >".$_SESSION['lang']['pph']."(".$bar['persenpph']."%): </span></td>
				<td>".$bar['nilaipph']."</td>
				<td><span >".$_SESSION['lang']['grnd_total'].": </span></td>
				<td>".$bar['grandtotal']."</td>
			</tr>
			<tr>
				<td><span >".$_SESSION['lang']['selisih'].": </span></td>
				<td>".$bar['selisih']."</td>
				<td><span >".$_SESSION['lang']['kodekegiatan']." ".$_SESSION['lang']['coa'].": </span></td>
				<td>".$bar['coa']."</td>
			</tr>
			</table></div>";
		}
	break;
	
	case ($method=='deleteHeader'):
		$nocounter=$_POST['nocounter'];
		
		$hasilht=$eksi->hapus('keu_trx_ht',
		" WHERE nocounter='".$nocounter."'");
		//echo "warning: ".$hasilht;
		if($hasilht){
			echo $_SESSION['lang']['alertdelete'];	
		}else {
			echo $_SESSION['lang']['hapusgagal'];	
		}

			
	break;
	
	case ($method=='getHeader'):
			$nocounter=$_POST['nocounter'];
			$str="select a.nocounter,a.strxtype,a.noinvoice,a.tanggalinvoice,a.tanggalinvterima,a.tgljatuhtempo,a.hrjatuhtempo,
			a.custsupplier,a.idbankcustsupplier, a.fakturpajak,a.tanggalfakturpajak,a.kodematauang,a.kurs,
			a.tipepembayaran,a.sumberdokumen,a.nodokumen,a.keterangan, a.total, a.diskon, a.kodeppn,  a.persenppn, a.kodepph, a.persenpph, a.kodepbbkb, a.persenpbbkb, a.penambah, a.pengurang, a.coa, a.selisih, b.npwp, b.namasupplier, c.kodebank, c.norekening
			from keu_trx_ht a left join log_5supplier b on a.custsupplier=b.supplierid
			left join log_banksupplier c on a.idbankcustsupplier=c.idbanksupplier
			where a.nocounter = '".$nocounter."' ";
			$res= $eksi->sSQL($str);
			
			$hasil="";
			foreach($res as $row ){
				$hasil.=$row['nocounter']."|";//0
				$hasil.=$row['strxtype']."|";//1
				$hasil.=$row['noinvoice']."|";//2
				$hasil.=$eksi->dmy($row['tanggalinvoice'])."|";//3
				$hasil.=$eksi->dmy($row['tgljatuhtempo'])."|";//4
				$hasil.=$row['custsupplier']."|";//5
				//$hasil.=$row['idbankcustsupplier']."|";//6
				//ganti jadi hari jatuh tempo ==Jo 08-05-2017==
				$hasil.=$row['hrjatuhtempo']."|";//6
				$hasil.=$row['fakturpajak']."|";//7
				$hasil.=$eksi->dmy($row['tanggalfakturpajak'])."|";//8
				$hasil.=$row['kodematauang']."|";//9
				$hasil.=$row['kurs']."|";//10
				//$hasil.=$row['tipepembayaran']."|";//11
				//ganti jadi tgl invoice diterima ==Jo 08-05-2017==
				$hasil.=$eksi->dmy($row['tanggalinvterima'])."|";//11
				$hasil.=$row['sumberdokumen']."|";//12
				$dok=$row['sumberdokumen'];
				$hasil.=$row['nodokumen']."|";//13
				$nodok=$row['nodokumen'];
				$hasil.=$row['keterangan']."|";//14
				
				
				$hasil.=$row['npwp']."|";//15
				$hasil.=$row['kodebank']."|";//16
				$hasil.=$row['norekening']."|";//17
				$hasil.=$row['diskon']."|";//18
				$hasil.=$row['kodeppn']."-".$row['persenppn']."|";//19
				$hasil.=$row['kodepph']."-".$row['persenpph']."|";//20
				$hasil.=$row['kodepbbkb']."-".$row['persenpbbkb']."|";//21
				$hasil.=$row['penambah']."|";//22
				$hasil.=$row['pengurang']."|";//23
				$hasil.=$row['coa']."|";//24
				$hasil.=$row['total']."|";//25
				$namasupl=$row['namasupplier'];
				$selisihs=$row['selisih'];
			}
			
			//untuk memunculkan list transaksi sesuai dokumen yang dipilih
			$opttrans="<option value=''></option>";
			switch ($dok){
				case $dokcip:
					$trans=$eksi->sSQL("SELECT nocip,keterangan FROM log_cipht where SUBSTRING_INDEX(nocip,'/',-1)='".$_SESSION['empl']['lokasitugas']."' and ifnull(isPosting,0)=0 ORDER BY tanggal DESC");
					foreach($trans as $bartrans){
						$opttrans.="<option value=".$bartrans['nocip'].">".$bartrans['nocip']." - ".$bartrans['keterangan']."</option>";
					}
				break;
				
				case $dokpo:
					//tambah filter vendor ==JO 04-05-03-2017==
				if($vendor==''){
					$wherevn="";
				}
				else{
					$wherevn="and a.kodesupplier='".$vendor."'";
				}
				$slhoso="select nama from setup_5parameter where flag='hoso' and kode ='".$_SESSION['empl']['pusat']."'";
				$reshoso=$eksi->sSQL($slhoso);
				foreach($reshoso as $barhoso){
					$hosos=$barhoso['nama'];
				}
				
				if($_SESSION['empl']['pusat']==1){
					$whrhs="";
				}
				else{
					$whrhs="and a.nocounter LIKE '%".$hosos."'";
				}
				
				$str="select a.nopo, a.nocounter
						from log_poht a
						inner join log_podt b ON a.nopo=b.nopo
						inner join log_prapodt c ON b.nopp =c.nopp AND b.kodebarang=c.kodebarang
						WHERE a.stat_release=1 AND a.kodeorg='".$_SESSION['empl']['kodeorganisasi']."'  
						".$whrhs."
						".$wherevn." group by a.nopo";
				//echo "warning: ".$str;
				$trans=$eksi->sSQL($str);
				foreach($trans as $bartrans){
					//tambahkan untuk cek apakah po sudah dibayar lunas atau belum ==Jo 02-05-2017==
					$slheader="select nilaidiskon from log_poht where nopo='".$bartrans['nopo']."'";
					$reshd=$eksi->sSQL($slheader);
					foreach($reshd as $barhd){
						$nldiskon=$barhd['nilaidiskon'];
					}
					$str="select sum(jumlahpesan*hargasatuan) as nilai from log_podt where nopo = '".$bartrans['nopo']."'";
					$totalnilai=0;
					$res= $eksi->sSQL($str);
					foreach($res as $bar) {
						$totalnilaiawal=$bar['nilai'];
					}
					$totalpo=$totalnilaiawal-$nldiskon;
					
					//tambah nilai invoice po yang sudah dibayar  sebelumnya ==Jo 21-03-2017==
					$totalsbl=0;
					$slsblm="select sum(nett) as nett from keu_trx_ht where nodokumen='".$bartrans['nopo']."' and status=".$statpost."";
					$ressblm=$eksi->sSQL($slsblm);
					foreach($ressblm as $barsblm){
						$totalsbl=$barsblm['nett'];
					}
					
					$totalnilai=$totalpo-$totalsbl;
					if($totalnilai>0){
						$opttrans.="<option value=".$bartrans['nopo'].">".$bartrans['nocounter']."</option>";
					}
					
				}
					$po=1;
				break;
				
				case $dokspk: //tambah filter harus ba spk nya blm pernah dibuat invoice ==JO 16-03-2017==
					//tambah filter lokasitugas ==Jo 05-06-2017==
					if($_SESSION['empl']['pusat']==1){
						$wherephk="and kodeorg like '".$_SESSION['empl']['kodeorganisasi']."%'";
					}
					else{
						$wherephk="and kodeorg='".$_SESSION['empl']['lokasitugas']."'";
					}
					
					//tambah filter vendor ==JO 04-05-03-2017==
					if($vendor==''){
						$wherevn="";
					}
					else{
						$wherevn="and pihak2='".$vendor."'";
					}
					
					$str="SELECT nospk FROM log_spkht_new  where stat_release=1 and complete=0 and nospk not in (select b.spk from keu_trx_ht a left join log_spk_ba b on  a.nodokumen=b.id  where a.sumberdokumen=".$dokbaspk." group by b.spk) ".$wherevn." ".$wherephk." ORDER BY nospk DESC";
					$trans=$eksi->sSQL($str); //where stat_release=1
					foreach($trans as $bartrans){
						$opttrans.="<option value=".$bartrans['nospk'].">".$bartrans['nospk']."</option>";
					}
				break;
				
				case $dokbaspk:
					//tambah filter lokasitugas ==Jo 05-06-2017==
					if($_SESSION['empl']['pusat']==1){
						$wherephk="and b.kodeorg like '".$_SESSION['empl']['kodeorganisasi']."%'";
					}
					else{
						$wherephk="and b.kodeorg='".$_SESSION['empl']['lokasitugas']."'";
					}
				
					//tambah filter vendor ==JO 04-05-03-2017==
					if($vendor==''){
						$wherevn="";
					}
					else{
						$wherevn="and b.pihak2='".$vendor."'";
					}
					$str="SELECT a.id,a.spk,a.namaba FROM log_spk_ba  a left join log_spkht_new b on a.spk=b.nospk where b.stat_release=1 and b.complete=0 and a.posting=1 ".$wherevn." ".$wherephk."  order by a.id ASC";
					$trans=$eksi->sSQL($str); //where stat_release=1
					foreach($trans as $bartrans){
						$opttrans.="<option value=".$bartrans['id'].">".$bartrans['spk']." - ".$bartrans['namaba']."</option>";
					}
				break;

				case $dokpibpo:
					//rubah filter sesuai pusat/tidak  ==Jo 10-03-2017==
					if($_SESSION['empl']['pusat']==1){
						$pusats="and lokalpusat=0";
					}
					else {
						$pusats="and lokalpusat=1";
					}
					
					$trans=$eksi->sSQL("SELECT nopo FROM log_poht where stat_release=1 and  pib>0 ".$pusats." ORDER BY tanggal DESC"); //where stat_release=1
					foreach($trans as $bartrans){
						$opttrans.="<option value=".$bartrans['nopo'].">".$bartrans['nopo']."</option>";
					}
				break;
				
				case $dokln:
					//fixing sesuaikan kode kegiatan dengan setup_5parameter ==Jo 27-03-2017==
					
					$trans=$eksi->sSQL("select a.noakun,a.namakegiatan from setup_kegiatan a left join setup_klpkegiatan b on a.kelompok=b.kodeklp where b.act='".$kodefin."' order by a.namakegiatan"); //where stat_release=1
				
					//$trans=$eksi->sSQL("select kodekegiatan,namakegiatan from setup_kegiatan a left join setup_klpkegiatan b on a.kelompok=b.kodeklp where b.act='".$kodefin."' order by namakegiatan"); //where stat_release=1
					foreach($trans as $bartrans){
						$opttrans.="<option value=".$bartrans['noakun'].">".$bartrans['namakegiatan']."</option>";
					}
					$ln=1;
				break;
						
				default:
				break;
				
			}
			$hasil.=$opttrans."|"; //26
			
			if ($dok==$dokpo){
				//Untuk memunculkan list PO  (Jika PO yang dipilih)
				$limit=10;
				$page=0;
				if(isset($_POST['page'])){
				$page=$_POST['page'];
				if($page<0)
				$page=0;
				}
				$offset=$page*$limit;	
				//$filter = "";
				//$filter="AND a.notransaksi='".$_POST['filter']."' AND a.tugaskma='".$_POST['keyword']."'";
				
				$str="select a.kodebarang, a.jumlahpesan, a.satuan, a.hargasatuan, (a.jumlahpesan*a.hargasatuan) as nilai, b.namabarang from log_podt a left join log_5masterbarang b on a.kodebarang=b.kodebarang where a.nopo = '".$nodok."'
				order by a.nopo desc limit ".$offset.",".$limit." ";
				$sql="select kodebarang from log_podt where nopo='".$nodok."' order by nopo desc";
				$res= $eksi->sSQL($str);
				$jlhbrs = 0;
				$no=($page*$limit);
				
				$jlhbrs= $eksi->sSQLnum($sql);
				
				if (count($res)>0){
					foreach($res as $bar) {
						$no+=1;
						$hasil.="<tr class=rowcontent>
							  <td>".$no."</td>
							  <td id=kdbrg".$no.">".$bar['kodebarang']."</td>
							  <td id=nmbrg".$no.">".$bar['namabarang']."</td>
							  <td id=jmbrg".$no.">".$bar['jumlahpesan']."</td>
							  <td id=satuan".$no.">".$bar['satuan']."</td>
							  <td id=harga".$no.">".number_format($bar['hargasatuan'],2,',','.')."</td>
							  <td id=nilai".$no.">".number_format($bar['nilai'],2,',','.')."</td>
							  
							 </tr>";
					}	

						
				}
				$hasil.="<tr class='footercolor'>
						<td colspan=7 align=center>
						".(($page*$limit)+1)." to ".(($page+1)*$limit)." Of ".  $jlhbrs."
						<br />
						<button class=mybutton onclick=cariBast(".($page-1).");>".$_SESSION['lang']['pref']."</button>
						<button class=mybutton onclick=cariBast(".($page+1).");>".$_SESSION['lang']['lanjut']."</button>
						<input type=hidden id=nomax value=".$no."></input>
						</td>
						</tr>"."|";//27
				$hasil.=$namasupl."|";//28
				$hasil.=$selisihs."|";//29
			}
			else {	
				
				if($dok==$dokln){
					$hasil.="1"."|";//27
					$hasil.=$row['total']."|"; //28
					$hasil.=$namasupl."|";//29
					$hasil.=$selisihs."|";//30
				}
				else if($dok==$dokpibpo){
					$hasil.="3"."|";//27
					$str="select pib from log_poht where nopo='".$nodok."'";
					$res= $eksi->sSQL($str);
					foreach($res as $bar){
						$nilaipib=$bar['pib'];
					}
					$hasil.=$nilaipib."|";//28
					//ambil kode PIB
					$slpib="select kode from setup_5parameter where flag='kodepib'";
					$respib=$eksi->sSQL($slpib);
					foreach($respib as $barpib){
						$kodepib=$barpib['kode'];
					}
					$strcoa="select noakun,kodekegiatan,namakegiatan from setup_kegiatan where kelompok='".$kodepib."' order by namakegiatan";
					$optCoa="<option value=''></option>";
					$rescoa=$eksi->sSQL($strcoa);
					foreach($rescoa as $barf){
					//$optCoa.="<option value='".$barf['kodekegiatan']."'>".$barf['kodekegiatan']."-".$barf['namakegiatan']."</option>";
					$optCoa.="<option value='".$barf['kodekegiatan']."'>".$barf['namakegiatan']."</option>";
					}
					$hasil.=$optCoa."|";//29
					$hasil.=$namasupl."|";//30
					$hasil.=$selisihs."|";//31
					
				}				
				else if($dok==$dokspk){
					$hasil.="2"."|";//27
					$str="select (dppersen*nilai) as nilaidps, nilaidp, nilairtn from log_spkht_new where stat_release=1 and complete=0 and nospk='".$nodok."'";
					$res= $eksi->sSQL($str);
					foreach($res as $bar){
						$nilaidps=$bar['nilaidps'];
						$nilaidp=$barspk['nilaidp'];
						$nilairtn=$barspk['nilairtn'];
					}
					$hasil.=$nilaidps."|";//28
					$hasil.=$namasupl."|";//29
					$hasil.=$nilaidp."|";//30
					$hasil.=$nilairtn."|";//31
					$hasil.=$selisihs."|";//32
				}	
				else if ($dok==$dokbaspk){
					$hasil.="4"."|";//27
					/*$str="select a.nominaldpp from log_spk_ba a left join log_spkht_new b on a.spk=b.nospk where b.stat_release=1 and b.complete=0 and a.posting=1 and a.id='".$nodok."'";
					$res= $eksi->sSQL($str);
					foreach($res as $bar){
						$nominaldpp=$bar['nominaldpp'];
					}*/
					$str="select nominaldpp,ppn,pph,spk from log_spk_ba where id='".$nodok."'";
					$totalnilai=0;
					$res= $eksi->sSQL($str);
					foreach($res as $bar) {
						$nilaibaspk=$bar['nominaldpp'];
						$persenppn=$bar['ppn'];
						$persenpph=$bar['pph'];
						$nospk=$bar['spk'];
					}
					
					$strspk="select nilai, nilaidp, nilairtn from log_spkht_new where nospk='".$nospk."'";
					$resspk= $eksi->sSQL($strspk);
					foreach($resspk as $barspk) {
						$totalspk=$barspk['nilai'];
						$nilaidp=$barspk['nilaidp'];
						$nilairtn=$barspk['nilairtn'];
					}
					
					//cari invoice sebelumnya
					$slfirst="SELECT 'invc' jenis, (nett+selisih) as nett, updatetime FROM keu_trx_ht where nodokumen in('".$nospk."',".$nodok.") and status=3 
					union all
					SELECT 'ba' jenis, nominaldpp, updated from log_spk_ba
					where posting=1 and spk= '".$nospk."' having (nominaldpp and updated) <> '' 
					order by updatetime,jenis;";
					//echo "warning: ".$slfirst;exit();
					$ttlfirst=$eksi->sSQLnum($slfirst);
					
					
					$resfirst=$eksi->sSQL($slfirst);
					$firstdt=Array();
					$idx=0;
					$totalinvc=Array();
					$totalba=Array();
					$totalbas=0;
					$totalinvcs=0;
					foreach($resfirst as $barfirst){
						$firstdt[$idx]=$barfirst['jenis'];
						if ($firstdt[$idx]=='invc'){
							$totalinvc[$idx]=$barfirst['nett'];
							$totalinvcs+=$barfirst['nett'];
						}
						if ($firstdt[$idx]=='ba'){
							$totalba[$idx]=$barfirst['nett'];
							$totalbas+=$barfirst['nett'];
						}
						$idx++;
					}
					if($ttlfirst>0 && $firstdt[$idx-1]=='ba'){
						
						//$totalnilai=($totalbas)-$totalinvcs;
						//$totalnilai=($totalbas)-$totalinvcs;
						if($totalbas<$totalinvcs){
							$totalnilai=0;
						}
						else{
							$totalnilai=($totalbas)-$totalinvcs;
						}
					}
					//tambah kondisi kalau nilai ba lebih kecil dari remaining ba ==Jo 25-05-2017==
					/*if($totalbas<$totalinvcs){
						$totalnilai=0;
					}
					else{
						$totalnilai=($totalbas)-$totalinvcs;
					}*/
					
					
					$hasil.=$totalnilai."|";//28
					$hasil.=$namasupl."|";//29
					$hasil.=$nilaidp."|";//30
					$hasil.=$nilairtn."|";//31
					$hasil.=$selisihs."|";//32
				}				
				else if($dok==$dokcip){
					$hasil.="4"."|";//27
					/*$str="select sum(ifnull(jumlah,1)*ifnull(hargasatuan,1)) as hargatotal from log_cipdt where nocip='".$nodok."'";
					$res= $eksi->sSQL($str);
					foreach($res as $bar){
						$hargatotal=$bar['hargatotal'];
					}
					$hasil.=$hargatotal."|";//28*/
					//rubah jadi tidak ambil nilai cip ==Jo 20-03-2017==
					$hasil.=$row['total']."|";//28
					$hasil.=$namasupl."|";//29
					$hasil.=$selisihs."|";//30
				}
				
			}	
			
			
			
			$hasil=substr(trim($hasil),0,strlen(trim($hasil))-1);
			echo $hasil;			
	break;
	
	default:
		break;
}

?>