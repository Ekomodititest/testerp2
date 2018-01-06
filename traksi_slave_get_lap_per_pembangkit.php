<?
require_once('master_validation.php');
require_once('config/connection.php');
require_once('lib/nangkoelib.php');
require_once('lib/zLib.php');

$method = isset($_POST['method']) ? $_POST['method'] : $_GET['method'];

function GetListPemakaianBarangKma($perusahaan,$lokasi,$tanggalawal,$tanggalakhir, $kodekmaheader, $namakegiatanheader,$oms,$tipeoperasional){
	global $dbname;
	
	$String = "SELECT DISTINCT 
	a.kodekma,
	a.namakma,
	a.kodekegiatan,
	a.dibuattanggal,
	a.dibuatoleh,
	a.tanggalmulai,
	a.tanggalselesai,
	a.jumlahsdm
	FROM
	(
	SELECT distinct d.notransaksi as notransaksi, d.createdate as dibuattanggal, d.usercreate as dibuatoleh, 
	g.namabarang as namakma, c.kodeorganisasi as kodegudang, d.kodekma,a.kodebarang,a.satuan,
	a.jumlah as jmlhkeluargdng,b.tanggal as tglkeluargdng,c.namaorganisasi as namagudang, d.kodekegiatan,
	d.tanggalmulai, d.tanggalselesai, d.jumlahsdm
	FROM log_transaksidt a
	LEFT JOIN log_transaksiht b ON a.notransaksi = b.notransaksi
	LEFT JOIN organisasi c ON b.kodegudang = c.kodeorganisasi
	LEFT JOIN vhc_trxomsh d ON a.traksi = d.notransaksi
	LEFT JOIN vhc_5master f on f.kodevhc = d.kodekma
	LEFT JOIN log_5masterbarang g on g.kodebarang = f.kodebarang
	WHERE b.untukpt = '".$perusahaan."' AND b.untukunit = '".$lokasi."' AND b.tipeop = '".$tipeoperasional."' AND b.oms = '".$oms."' AND b.tanggal >= '".$tanggalawal."' AND b.tanggal <= '".$tanggalakhir."' AND b.post = 1
	AND d.kodekma LIKE '%".$kodekmaheader."%'
	AND d.kodekegiatan LIKE '%".$namakegiatanheader."%'
	GROUP BY a.notransaksi
	ORDER BY g.namabarang
	) a
	LEFT JOIN log_5masterbarang c ON a.kodebarang = c.kodebarang
	WHERE
	a.kodekma IS NOT NULL AND a.kodekma <> ''
	ORDER BY a.kodekegiatan asc;";

	#pre($String);
	$Result = fetchData($String);
	#pre($Result);
	return $Result;
}
function GetListPemakaianBarangKma2($perusahaan,$lokasi,$tanggalawal,$tanggalakhir, $kodekmaheader, $namakegiatanheader,$oms,$tipeoperasional){
	global $dbname;
	
	$String = "SELECT 
	a.kodekma,
	a.kodekegiatan,
	a.kodebarang,
	a.namabarang,
	a.satuan,
	a.jumlah,
	a.keterangan
	FROM
	(
	SELECT d.kodekma,d.kodekegiatan,f.kodebarang,g.namabarang,g.satuan,a.jumlah,a.keterangan
	FROM log_transaksidt a
	LEFT JOIN log_transaksiht b ON a.notransaksi = b.notransaksi
	LEFT JOIN organisasi c ON b.kodegudang = c.kodeorganisasi
	LEFT JOIN vhc_trxomsh d ON a.traksi = d.notransaksi
	LEFT JOIN vhc_5master f on f.kodevhc = d.kodekma
	LEFT JOIN log_5masterbarang g on g.kodebarang = f.kodebarang
	WHERE b.untukpt = '".$perusahaan."' AND b.untukunit = '".$lokasi."' AND b.tipeop = '".$tipeoperasional."' AND b.oms = '".$oms."' AND b.tanggal >= '".$tanggalawal."' AND b.tanggal <= '".$tanggalakhir."' AND b.post = 1
	AND d.kodekma LIKE '%".$kodekmaheader."%'
	AND d.kodekegiatan LIKE '%".$namakegiatanheader."%'
	GROUP BY a.notransaksi
	ORDER BY g.namabarang
	) a
	LEFT JOIN log_5masterbarang c ON a.kodebarang = c.kodebarang
	WHERE
	a.kodekma IS NOT NULL AND a.kodekma <> ''
	ORDER BY a.kodekegiatan asc;";

	#pre($String);
	$Result = fetchData($String);
	#pre($Result);
	return $Result;
}
function putertanggal($tgl){
    $qwe=explode("-",$tgl);
    return $qwe[2]."-".$qwe[1]."-".$qwe[0];
}

switch($method){
	case 'GetNamaKMA':
		$textsearch	 = isset($_POST['textsearch']) ? $_POST['textsearch'] : '';
		$lokasi = $_POST['lokasi'];
		$tipeoperasional = $_POST['tipeoperasional'];
		$oms = $_POST['oms'];
		
		$Return = "<table cellspacing=1 border=0 class=data>";
		$Return.= "<thead><tr class=rowheader>";
		$Return.= "<td>No</td>";
		$Return.= "<td>Kode Organisasi</td>";
		$Return.= "<td>O/M/S</td>";
		$Return.= "<td>Nama KMA</td>";
		$Return.= "</tr></thead><tbody>";
		
		$String = "SELECT DISTINCT
		b.kodeorganisasi,
		IFNULL(
			(
			SELECT
				d.nama
			FROM
				setup_5parameter d
			WHERE
				d.flag = 'jnstraksi2'
			AND a.jenistransaksi = d.kode
			),
			' '
		) AS namajenistrakasi,
		concat(
			e.kodevhc,
			' - ',
			f.namabarang
		) AS namakma,
		e.kodevhc
		FROM
		vhc_trxomsh a
		LEFT JOIN organisasi b ON a.kodeorganisasi = b.kodeorganisasi
		LEFT JOIN setup_5parameter c ON c.flag = 'tipetraksi'
		AND a.tipetransaksi = c.kode
		LEFT JOIN vhc_5master e ON a.kodekma = e.kodevhc
		LEFT JOIN log_5masterbarang f ON e.kodebarang = f.kodebarang
		WHERE
		a.kodeorganisasi = '".$lokasi."'
		AND a.tipetransaksi = '".$tipeoperasional."'
		AND a.jenistransaksi = '".$oms."'
		AND concat(
			e.kodevhc,
			' - ',
			f.namabarang
		) like '%".$textsearch."%';";
		#pre($String);
		$Result = fetchData($String);
		
		$no=0;
		foreach($Result as $Key => $Value){
			$no+=1;
			
			$Return.= "<tr class=rowcontent  style='cursor:pointer;' title='Click It' onclick=\"SetNamaKMA('".$Value['namakma']."', '".$Value['kodevhc']."')\">";
			$Return.= "<td>".$no."</td>";
			$Return.= "<td>".$Value['kodeorganisasi']."</td>";
			$Return.= "<td>".$Value['namajenistrakasi']."</td>";
			$Return.= "<td>".$Value['namakma']."</td>";
			
		}

		$Return.= "</tbody><tfoot></tfoot></table>";
		
		echo $Return;
	break;
	case'GetLokasi':
		$OptLokasi="<option value=''>".$_SESSION['lang']['pilihdata']."</option>";
		if($_SESSION['empl']['pusat'] == 1) {
			$sLokasi="select distinct kodeorganisasi,namaorganisasi from ".$dbname.".organisasi where 
			induk = '".$_POST['perusahaan']."' order by namaorganisasi asc";
		} else {
			$sLokasi="select distinct kodeorganisasi,namaorganisasi from ".$dbname.".organisasi where 
			induk = '".$_POST['perusahaan']."' and kodeorganisasi = '".$_SESSION['empl']['lokasitugas']."' order by namaorganisasi asc";
		}
		
		$qLokasi=mysql_query($sLokasi) or die(mysql_error($conn));
		while($rLokasi=mysql_fetch_assoc($qLokasi))
		{
			$OptLokasi.="<option value='".$rLokasi['kodeorganisasi']."'>".$rLokasi['namaorganisasi']." - ".$rLokasi['kodeorganisasi']."</option>";
		}
		echo $OptLokasi;
	break;
	case'GetKegiatanKMA':
		$OptKegiatan="<option value=''>".$_SESSION['lang']['pilihdata']."</option>";
		$sKegiatan="select kodekegiatan from ".$dbname.".vhc_trxomsh where 
		kodeorganisasi = '".$_POST['lokasi']."' and kodekma = '".$_POST['kodekmaheader']."' and statustrx != 0 
		and tipetransaksi = '".$_POST['tipeoperasional']."'
		and jenistransaksi = '".$_POST['oms']."'";
		$qKegiatan=mysql_query($sKegiatan) or die(mysql_error($conn));
		#pre($sKegiatan);
		while($rKegiatan=mysql_fetch_assoc($qKegiatan))
		{
			$OptKegiatan.="<option value='".$rKegiatan['kodekegiatan']."'>".$rKegiatan['kodekegiatan']."</option>";
		}
		echo $OptKegiatan;
	break;
	
	
	
	case 'LoadData':
		#pre($_POST);
		$ListData = GetListPemakaianBarangKma($_POST['perusahaan'], $_POST['lokasi'], putertanggal($_POST['tanggalawal']), putertanggal($_POST['tanggalakhir']), $_POST['kodekmaheader'], $_POST['namakegiatanheader'],$_POST['oms'],$_POST['tipeoperasional']);
		#pre($ListData);
		$stream ="<table border=1 id='ListData'>";
		$stream.="<thead><tr><td colspan=9>Perencanaan Kegiatan</td></tr><tr>";
		$stream.="<td>".$_SESSION['lang']['no']."</td>";
		$stream.="<td>Nama Kegiatan</td>";
		$stream.="<td>Nama KMA</td>";
		$stream.="<td>Tanggal Mulai Kegiatan</td>";
		$stream.="<td>Tanggal Selesai Kegiatan</td>";
		$stream.="<td>Jumlah SDM</td>";
		$stream.="<td>Tanggal Dibuat</td>";
		$stream.="<td>Dibuat Oleh</td>";
		$stream.="</tr>";
		$stream.="</thead><tbody>";
		$NoListData = 1;
		$SubTotal = array();
		foreach($ListData as $LBKey => $LBVal){
			$stream.="<tr class=rowcontent>";
			$stream.="<td>".$NoListData."</td>";
			$stream.="<td>".$LBVal['kodekegiatan']."</td>";
			$stream.="<td>".$LBVal['kodekma']." - ".$LBVal['namakma']."</td>";
			$stream.="<td>".$LBVal['tanggalmulai']."</td>";
			$stream.="<td>".$LBVal['tanggalselesai']."</td>";
			$stream.="<td>".$LBVal['jumlahsdm']."</td>";
			$stream.="<td>".substr($LBVal['dibuattanggal'],0,10)."</td>";
			$stream.="<td>".$LBVal['dibuatoleh']."</td>";
			$stream.="</tr>";
			$NoListData++;
		}
		$stream.="</tbody></table><br>";
		
		$ListDataDetail = GetListPemakaianBarangKma2($_POST['perusahaan'], $_POST['lokasi'], putertanggal($_POST['tanggalawal']), putertanggal($_POST['tanggalakhir']), $_POST['kodekmaheader'], $_POST['namakegiatanheader'],$_POST['oms'],$_POST['tipeoperasional']);
		#pre($ListData);
		$stream.="<table border=1 id='ListData'>";
		$stream.="<thead><tr><td colspan=6>Perencanaan Pemakaian Barang</td></tr><tr>";
		$stream.="<td>".$_SESSION['lang']['no']."</td>";
		$stream.="<td>Kode Barang</td>";
		$stream.="<td>Nama Barang</td>";
		$stream.="<td>Satuan</td>";
		$stream.="<td>Qty</td>";
		$stream.="<td>Keterangan</td>";
		$stream.="</tr>";
		$stream.="</thead><tbody>";
		$NoListData = 1;
		$SubTotal = array();
		foreach($ListDataDetail as $LBDKey => $LBDVal){
			$stream.="<tr class=rowcontent>";
			$stream.="<td>".$NoListData."</td>";
			$stream.="<td>".$LBDVal['kodebarang']."</td>";
			$stream.="<td>".$LBDVal['namabarang']."</td>";
			$stream.="<td>".$LBDVal['satuan']."</td>";
			$stream.="<td>".$LBDVal['jumlah']."</td>";
			$stream.="<td>".$LBDVal['keterangan']."</td>";
			$stream.="</tr>";
			$NoListData++;
		}
		$stream.="</tbody></table>";
		echo $stream;
	break;
	case'DownloadExcel':
		#pre($_GET);exit();
		$stream = "<table border=0><tr><td colspan=12 align=center><b>LAPORAN PROSES KMA</b></td></tr></table><br>";
		$stream.="<table border=0>";
		$stream.="<tr>";
		$stream.="<td colspan=2>Perusahaan</td>";
		$stream.="<td colspan=3>: ".$_GET['perusahaanname']."</td>";
		$stream.="</tr>";
		$stream.="<tr>";
		$stream.="<td colspan=2>Lokasi</td>";
		$stream.="<td colspan=3>: ".$_GET['lokasiname']."</td>";
		$stream.="</tr>";
		$stream.="<tr>";
		$stream.="<td colspan=2>Tanggal</td>";
		$stream.="<td colspan=3>: ".$_GET['tanggalawal']." S/D ".$_GET['tanggalakhir']."</td>";
		$stream.="</tr>";
		$stream.="<tr>";
		$stream.="<td colspan=2>Tipe Operasional</td>";
		$stream.="<td colspan=3>: ".$_GET['tipeoperasionalname']."</td>";
		$stream.="</tr>";
		$stream.="<tr>";
		$stream.="<td colspan=2>O/M/S</td>";
		$stream.="<td colspan=3>: ".$_GET['omsname']."</td>";
		$stream.="</tr>";
		$stream.="<tr>";
		$stream.="<td colspan=2>Nama KMA</td>";
		$NamaKMA = empty($_GET['namakmaheader']) ? '-' : $_GET['namakmaheader'];
		$stream.="<td colspan=3>: ".$NamaKMA."</td>";
		$stream.="</tr>";
		$stream.="<tr>";
		$stream.="<td colspan=2>Nama Kegiatan</td>";
		$NamaKegiatan = empty($_GET['namakegiatanheader']) ? '-' : $_GET['namakegiatanheader'];
		$stream.="<td colspan=3>: ".$NamaKegiatan."</td>";
		$stream.="</tr>";
		$stream.="</table><br>";
		
		$ListData = GetListPemakaianBarangKma($_GET['perusahaan'], $_GET['lokasi'], putertanggal($_GET['tanggalawal']), putertanggal($_GET['tanggalakhir']), $_GET['kodekmaheader'], $_GET['namakegiatanheader'],$_GET['oms'],$_GET['tipeoperasional']);
		#pre($ListData);
		$stream.="<table border=1 id='ListData'>";
		$stream.="<thead><tr><td colspan=8>Perencanaan Kegiatan</td></tr><tr>";
		$stream.="<td>".$_SESSION['lang']['no']."</td>";
		$stream.="<td>Nama Kegiatan</td>";
		$stream.="<td>Nama KMA</td>";
		$stream.="<td>Tanggal Mulai Kegiatan</td>";
		$stream.="<td>Tanggal Selesai Kegiatan</td>";
		$stream.="<td>Jumlah SDM</td>";
		$stream.="<td>Tanggal Dibuat</td>";
		$stream.="<td>Dibuat Oleh</td>";
		$stream.="</tr>";
		$stream.="</thead><tbody>";
		$NoListData = 1;
		$SubTotal = array();
		foreach($ListData as $LBKey => $LBVal){
			$stream.="<tr class=rowcontent>";
			$stream.="<td>".$NoListData."</td>";
			$stream.="<td>".$LBVal['kodekegiatan']."</td>";
			$stream.="<td>".$LBVal['kodekma']." - ".$LBVal['namakma']."</td>";
			$stream.="<td>".$LBVal['tanggalmulai']."</td>";
			$stream.="<td>".$LBVal['tanggalselesai']."</td>";
			$stream.="<td>".$LBVal['jumlahsdm']."</td>";
			$stream.="<td>".substr($LBVal['dibuattanggal'],0,10)."</td>";
			$stream.="<td>".$LBVal['dibuatoleh']."</td>";
			$stream.="</tr>";
			$NoListData++;
		}
		$stream.="</tbody></table><br>";
		
		$ListDataDetail = GetListPemakaianBarangKma2($_GET['perusahaan'], $_GET['lokasi'], putertanggal($_GET['tanggalawal']), putertanggal($_GET['tanggalakhir']), $_GET['kodekmaheader'], $_GET['namakegiatanheader'],$_GET['oms'],$_GET['tipeoperasional']);
		#pre($ListData);
		$stream.="<table border=1 id='ListData'>";
		$stream.="<thead><tr><td colspan=6>Perencanaan Pemakaian Barang</td></tr><tr>";
		$stream.="<td>".$_SESSION['lang']['no']."</td>";
		$stream.="<td>Kode Barang</td>";
		$stream.="<td>Nama Barang</td>";
		$stream.="<td>Satuan</td>";
		$stream.="<td>Qty</td>";
		$stream.="<td>Keterangan</td>";
		$stream.="</tr>";
		$stream.="</thead><tbody>";
		$NoListData = 1;
		$SubTotal = array();
		foreach($ListDataDetail as $LBDKey => $LBDVal){
			$stream.="<tr class=rowcontent>";
			$stream.="<td>".$NoListData."</td>";
			$stream.="<td>".$LBDVal['kodebarang']."</td>";
			$stream.="<td>".$LBDVal['namabarang']."</td>";
			$stream.="<td>".$LBDVal['satuan']."</td>";
			$stream.="<td>".$LBDVal['jumlah']."</td>";
			$stream.="<td>".$LBDVal['keterangan']."</td>";
			$stream.="</tr>";
			$NoListData++;
		}
		$stream.="</tbody></table>";
		
		$nop_="Laporan Proses KMA";
		if(strlen($stream)>0) {
			if($handle = opendir('tempExcel')) {
				while (false !== ($file = readdir($handle))) {
					if($file != "." && $file != "..") {
						@unlink('tempExcel/'.$file);
					}
				}	
				closedir($handle);
			}
			
			$handle=fopen("tempExcel/".$nop_.".xls",'w');
			if(!fwrite($handle,$stream)){
				echo "<script language=javascript1.2>
				parent.window.alert('Can't convert to excel format');
				</script>";
				exit;
			} else {
				echo "<script language=javascript1.2>
				window.location='tempExcel/".$nop_.".xls';
				</script>";
			}
			closedir($handle);
		}
	break;
	
	case 'CariNoPr':
		$List= GetNoPr($_POST['noprpopup']);
		#pre($ListBarang);
		$stream ="<table border=1>";
		$stream.="<thead><tr>";
		$stream.="<td>".$_SESSION['lang']['nopp']."</td>";
		$stream.="<td>".$_SESSION['lang']['tanggal']."</td>";
		$stream.="</tr>";
		$stream.="</thead><tbody>";
		$ListNo = 1;
		foreach($List as $LKey => $LVal){
			$stream.="<tr class=rowcontent  style='cursor:pointer;' title='Click It' onclick=CariNoPrPick('".$ListNo."')>";
			$stream.="<td>".$LVal['nopp']."</td>";
			$stream.="<td>".$LVal['tanggal']."</td>";
			$stream.="<input type='hidden' id='list_".$ListNo."' value='".$LVal['nopp']."'>";
			$stream.="</tr>";
			$ListNo++;
		}
		$stream.="</tbody></table>";
		echo $stream;
	break;
	case'CariNoTutupPaksaPR':
		$List= GetNoTutupPaksaPR($_POST['textsearch']);
		$stream ="<table border=1>";
		$stream.="<thead><tr>";
		$stream.="<td>".$_SESSION['lang']['notutuppaksa']."</td>";
		$stream.="<td>".$_SESSION['lang']['tipetransaksi']."</td>";
		$stream.="<td>".$_SESSION['lang']['notransaksi']."</td>";
		$stream.="<td>".$_SESSION['lang']['tanggal']."</td>";
		$stream.="</tr>";
		$stream.="</thead><tbody>";
		$ListNo = 1;
		foreach($List as $LKey => $LVal){
			$stream.="<tr class=rowcontent  style='cursor:pointer;' title='Click It' onclick=SetNoTutupPaksaPR('".$ListNo."')>";
			$stream.="<td>".$LVal['no_tutup_paksa']."</td>";
			$stream.="<td>".$LVal['tipe_transaksi']."</td>";
			$stream.="<td>".$LVal['no_transaksi']."</td>";
			$stream.="<td>".$LVal['created_date']."</td>";
			$stream.="<input type='hidden' id='notutuppaksa_".$ListNo."' value='".$LVal['no_tutup_paksa']."'>";
			$stream.="</tr>";
			$ListNo++;
		}
		$stream.="</tbody></table>";
		echo $stream;
	break;
	default:
	  $strx="select 1=1";
	break;	
}
?>
