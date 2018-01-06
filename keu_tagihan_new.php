<?php

require_once('master_validation.php');
include('lib/nangkoelib.php');
include('lib/zFunction.php');
require_once('lib/eksilib.php');
echo open_body();
?>
<link rel="stylesheet" type="text/css" href="style/zTable.css">
<script language="javascript" src="js/zMaster.js"></script>
<script language='javascript' src='js/zTools.js'></script>
<script language='javascript' src='js/generic.js'></script>
<script language='javascript' src='js/keu_tagihan_new.js'></script>
<?php
include('master_mainMenu.php');
OPEN_BOX();

$frm[0]='';
$frm[1]='';
$frm[2]='';
?>

<!-- header -->
<fieldset>
<legend><b><?php echo $_SESSION['lang']['tagihanmasuk'];?></b></legend>	
<table>
<tr>
<td width='80px'><img class='delliconBig' onclick='baru();' src='images/newfile.png' title='<?php echo $_SESSION['lang']['new'];?>'></td>
<td><img class='delliconBig' onclick='loadData();' src='images/orgicon.png' title='<?php echo $_SESSION['lang']['list'];?>'></td>
</tr>
<tr>
<td><?php echo $_SESSION['lang']['new'];?></td>
<td><?php echo $_SESSION['lang']['list'];?></td>
</tr>
</table>
<input hidden=true id="defaultcompany" value=<?php echo $_SESSION['empl']['lokasitugas'];?> >		
</fieldset>

<!-- List data -->

<fieldset id='listdata'>
<legend><b><?php echo $_SESSION['lang']['list'];?></b></legend>
<div>
<span ><?php echo $_SESSION['lang']['tanggal']; ?> : </span>
<input type='text' id='tglcari' class=myinputtext onmouseover=setCalendar(this) />
<?php echo $_SESSION['lang']['filter']; ?> : 
<select id='filter'>
	<option value=''><?php echo $_SESSION['lang']['all'];?></option>
	<option value='b.namasupplier'><?php echo $_SESSION['lang']['vendor'];?></option>
	<option value='a.noinvoice'><?php echo $_SESSION['lang']['faktur'];?></option>
	<option value='a.sumberdokumen'><?php echo $_SESSION['lang']['sumberdok'];?></option>
</select>
<span id='findword'><?php echo $_SESSION['lang']['find']; ?> : </span>
<input type='text' id='keyword' />
<button class='mybutton' onclick='cariList(0)'><?php echo $_SESSION['lang']['find']; ?></button>
<br/><br/>		
<table class='sortable' cellspacing='1' border='0'>
<thead>
<tr class='rowheader'>
		<th><?php echo $_SESSION['lang']['no'];?></th>
		<th><?php echo $_SESSION['lang']['tanggal'];?></th>
		<th><?php echo $_SESSION['lang']['vendor'];?></th>
		<th><?php echo $_SESSION['lang']['faktur'];?></th>
		<th><?php echo $_SESSION['lang']['sumberdok'];?></th>
		<th><?php echo $_SESSION['lang']['momordok'];?></th>
		<th><?php echo $_SESSION['lang']['keterangan'];?></th>
		<th><?php echo $_SESSION['lang']['total'];?></th>
		<th><?php echo $_SESSION['lang']['status'];?></th>
		<th><?php echo $_SESSION['lang']['action'];?></th>
</tr>
</thead>
<tbody id='container'>
<script>loadData();</script>
</tbody>
</table>
</div>
</fieldset>
<!-- detail entry -->
<!-- ================================== Header Kegiatan -->
<?php

//===Jo 20170201==
$optspl="<option value=''></option>";
$spl=$eksi->sSQL("SELECT supplierid,namasupplier FROM log_5supplier ORDER BY namasupplier ASC");
foreach($spl as $barspl){
	$optspl.="<option value=".$barspl['supplierid'].">".$barspl['namasupplier']."</option>";
}

$optbank="<option value=''></option>";
$bank=$eksi->sSQL("SELECT idbanksupplier,kodebank,atasnama,norekening FROM log_banksupplier ORDER BY kodebank ASC");
foreach($bank as $barbank){
	$optbank.="<option value=".$barbank['idbanksupplier'].">".$barbank['kodebank']." (".$barbank['norekening']." - a/n ".$barbank['atasnama'].")</option>";
}
//rubah jadi kode saja ==Jo 06-03-2017==
$optmatauang="<option value=''></option>";
$matauang=$eksi->sSQL("SELECT kode FROM setup_matauang ORDER BY matauang ASC");
foreach($matauang as $barmatauang){
	$optmatauang.="<option value=".$barmatauang['kode'].">".$barmatauang['kode']." </option>";
}

$optpmb="<option value=''></option>";
$pmb=$eksi->sSQL("SELECT kode,nama FROM setup_5parameter where flag='tipebyr' ORDER BY nama ASC");
foreach($pmb as $barpmb){
	$optpmb.="<option value=".$barpmb['kode'].">".$barpmb['nama']." </option>";
}

$optdok="<option value=''></option>";
$dok=$eksi->sSQL("SELECT kode,nama FROM setup_5parameter where flag='sumberdok' order by nama asc");
foreach($dok as $bardok){
	$optdok.="<option value=".$bardok['kode'].">".$bardok['nama']." </option>";
}

$opttipe="<option value=''></option>";
$tipe=$eksi->sSQL("SELECT a.kode as kode,concat(b.nama,' ',a.nama)as nama FROM keu_5strx a, keu_5trx b where a.kodeinduk=b.kode and b.kode in(100)  order by kode asc");
foreach($tipe as $bartipe){
	if($bartipe['kode']==1002){
		$opttipe.="<option value=".$bartipe['kode']." selected>".$bartipe['nama']." </option>";
	}
	else{
		$opttipe.="<option value=".$bartipe['kode'].">".$bartipe['nama']." </option>";
	}
	
}
//untuk ambil kode transaksi invoice in
$slcode="select kode from setup_5parameter where flag='tagihan'";
$rescode=$eksi->sSQL($slcode);
foreach($rescode as $barcode){
	$kodetr=$barcode['kode'];
}

//untuk format nocounter
$nocounterfirst=$_SESSION['empl']['kodeorganisasi']."/".$_SESSION['empl']['lokasitugas']."/".$kodetr."/";
if ($eksi->sSQLnum("select nocounter from keu_trx_ht where trxtype=".$kodetr." order by nocounter desc limit 1")>0){
	$counter=$eksi->sSQL("select nocounter from keu_trx_ht where trxtype=".$kodetr." order by nocounter desc limit 1");
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

//rubah faktur pajak dan tanggalnya jadi tidak mandatory ==JO 06-03-2017==
$frm[0]="
	<fieldset id='headertagihan'>
	<legend><b>".$_SESSION['lang']['header']."</b></legend>	
	<table>	
	<tr>
	<td hidden=true><span id='lblnotransaksi'>".$_SESSION['lang']['invcounter']."</span><img src='images/obl.png'/></td>
	<td hidden=true><input type='text' class='myinputtext'  style='width:150px;' id='nocounter' onkeypress='return tanpa_kutip(event)' maxlength=45  /></td>
	<input type=hidden id=nocountawal value=".$nocounterfirst." />
	<input type=hidden id=nocountakhir value=".$nocounterlast." />
	</tr>
	
	<tr>
	<td><span >".$_SESSION['lang']['noinvoice']."</span><img src='images/obl.png'/></td>
	<td><input type=text id=noinv name=noinv class=myinputtext style=width:320px; onkeypress='return tanpa_kutip(event)' maxlength=100  onblur=\"checkinv();\"/>
	
	<input type=hidden id='noinvinsdhada' value='".$_SESSION['lang']['noinvinsdhada']."'>
	</td>
	<td><span >".$_SESSION['lang']['vendor']."</span><img src='images/obl.png'/></td>
	<td>
	<input type='text' id='namavendor' size='20' style='width:300px;' class='myinputtext' value='' onkeyup=PopUpSearchItem('Vendor','ListVendor',event) onchange=PopUpSearchItem('Vendor','ListVendor',event)>
	<input type='hidden' id='pilihvendor'>
	<img id='buttoncari' src='images/zoom.png' title='Cari Vendor' class='resicon' onclick=PopUpSearchItem('Vendor','ListVendor',event) />
	</td>
	
	
	</tr>
	
	<tr>
	<td><span>".$_SESSION['lang']['tglinvoice']."</span><img src='images/obl.png'/></td>
	<td>
	<input type=text id=tanggalinv class=myinputtext onkeypress=\"return false;\" onmouseover=setCalendar(this) onchange=\"setTgFaktur();\" style=width:320px; size=10 >
	</td>
	
	<td><span>".$_SESSION['lang']['npwp']."</span></td>
	<td><input type=text id=npwp class=myinputtext disabled style=width:320px; onkeypress='return tanpa_kutip(event)' maxlength=100>
	</td>
	</td>

	
	</tr>
	
	<tr>
	<td><span >".$_SESSION['lang']['tglinvoicetrm']."</span><img src='images/obl.png'/></td>
	<td>
	<input type=text id=tanggalinvtr class=myinputtext onkeypress=\"return false;\" onmouseover=setCalendar(this) onchange=\"hitungjtm();\" style=width:320px; size=10>
	</td>
	
	<td><span >".$_SESSION['lang']['sumberdok']."</span><img src='images/obl.png'/></td>
	<td><select id='pilihdok' style='width:100px;' onchange=getTrans() >".$optdok."</select>
	<select id='pilihtrans' style='width:196px;' onchange='getDetailTotal();' ></select></td>
	<input type=hidden id=tipetrans></input>
	</tr>

	
	<tr>	
	<tr>
	<td><span >".$_SESSION['lang']['hrjatuhtempo']."</span><img src='images/obl.png'/></td>
	<td>
	<input type=text id=hrjatuhtmp class=myinputtext onkeypress=\"return angka_doang(event);\" onchange=\"hitungjtm();\"  style=width:320px; size=10>
	</td>
	
	<td><span >".$_SESSION['lang']['matauang']."</span><img src='images/obl.png'/></td>
	<td><select id='pilihmtuang' style='width:160px;' onchange=getDefaultKurs()>".$optmatauang."</select>
	<span >".$_SESSION['lang']['kurs']."</span><img src='images/obl.png'/>
	<input type=text id=kurs class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=10 value=0 onblur=\"change_number(this);\" style=width:100px;>
	</td>
	
	</tr>

	
	<tr>	
	<tr>
	<td><span >".$_SESSION['lang']['tgljatuhtempo']."</span><img src='images/obl.png'/></td>
	<td>
	<input type=text id=tgljatuhtempo class=myinputtext onkeypress=\"return false;\" onmouseover=setCalendar(this) style=width:320px; size=10 disabled >
	</td>
	
	<td><span id='lblketerangan'>".$_SESSION['lang']['keterangan']."</span></td>
	<td><textarea id=keterangan cols=25 rows=2 onkeypress=\"return tanpa_kutip(event);\" maxlength=500 style=width:310px;></textarea></td>
	
	</tr>

	
	<tr>
	<td><span >".$_SESSION['lang']['tglfaktur']."</span></td>
	<td><input type=text id=tanggalft class=myinputtext onkeypress=\"return false;\" onmouseover=setCalendar(this) style=width:320px; size=10 disabled>
	
	</td>
	
	</tr>

		
	<tr>
	
	<td><span >".$_SESSION['lang']['ftpajak']."</span></td>
	<td><input type=text id=ftpajak name=ftpajak class=myinputtext style=width:320px; onkeypress='return tanpa_kutip(event)' maxlength=100  />
	</td>
	
	</tr>
	
	<!--<tr>
	<td><span >".$_SESSION['lang']['bankvendor']."</span><img src='images/obl.png'/></td>
	<td><select id='pilihbank' style='width:320px;' onchange=getKodeBank()>".$optbank."</select>
	</td>
	<td><span >".$_SESSION['lang']['tipepmb']."</span><img src='images/obl.png'/></td>
	<td><select id='pilihpmb' style='width:320px;' >".$optpmb."</select>
	
	</tr>-->
	
	<!--<tr>
	<td><span >".$_SESSION['lang']['kode']." / ".$_SESSION['lang']['rekening']."</span></td>
	<td><input type=text id=kodebank class=myinputtext disabled style=width:100px; onkeypress='return tanpa_kutip(event)' maxlength=100>
	<input type=text id=rekbank class=myinputtext disabled style=width:200px; onkeypress='return tanpa_kutip(event)' maxlength=100>
	</td>-->
	
	</tr>	
	
	<tr style='display:none;'>
	<td><span >".$_SESSION['lang']['tipetransaksi']."</span><img src='images/obl.png'/></td>
	<td><select id='pilihtipe' style='width:320px;' onchange=getCounter() >".$opttipe."</select>
	
	</tr>
	
	
	</table>		
	
	<!--<button class='mybutton' onclick='resetHeader();'>".$_SESSION['lang']['reset']."</button>-->
	<button class='mybutton' onclick='lanjutHeader();'>".$_SESSION['lang']['lanjut']."</button>
	</fieldset>
	";

?>
<!-- ================================== Detail PO -->
<?php


?>


<?php
$frm[1]="
	
	
	<fieldset id='listdetail'>
	<legend><b>".$_SESSION['lang']['detailPembelian']."</b></legend>
	<div>
	<table id='detailpo' class='sortable' cellspacing='1' border='0'>
	<thead>
	<tr class='rowheader'>
			<th>". $_SESSION['lang']['no']."</th>
			<th>".$_SESSION['lang']['kodebarang']."</th>
			<th>".$_SESSION['lang']['namabarang']."</th>
			<th>".$_SESSION['lang']['kuantitas']."</th>
			<th>".$_SESSION['lang']['satuan']."</th>
			<th>".$_SESSION['lang']['harga']."</th>
			<th>".$_SESSION['lang']['nilai']."</th>
	</tr>
	</thead>
	<tbody id='container1'>
	
	</tbody>
	</table>
	</div>
	<button class='mybutton' onclick='lanjutDetail();'>".$_SESSION['lang']['lanjut']."</button>
	</fieldset>
	
	";
?>
<!-- ================================== Summary -->




<?php
$optPpn="<option value=0-0>".$_SESSION['lang']['pilih']."</option>";
$strPpn = "select kode,nama,rate,deskripsi from ".$dbname.".log_master_pajak where tipe='VAT'";
$resPpn=$eksi->sSQL($strPpn);
foreach($resPpn as $bar){
$optPpn.="<option value='".$bar['kode']."-".$bar['rate']."'>".$bar['deskripsi']."</option>";
}

$optPph="<option value=0-0>".$_SESSION['lang']['pilih']."</option>";
$strPph = "select kode,nama,rate,deskripsi from ".$dbname.".log_master_pajak where tipe='WHT'";
$resPph=$eksi->sSQL($strPph);
foreach($resPph as $bar){
   $optPph.="<option value='".$bar['kode']."-".$bar['rate']."'>".$bar['deskripsi']."</option>";
}


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
$slpibpo="select kode from  setup_5parameter where flag='dokpibpo'";
$respibpo=$eksi->sSQL($slpibpo);
foreach($respibpo as $barpibpo){
	$dokpibpo=$barpibpo['kode'];
}

//ambil mata uang yang merupakan default ==Jo 20-03-2017==
$slmtuang="select kode from setup_matauang where `default`=1";
$resmtuang=$eksi->sSQL($slmtuang);
foreach($resmtuang as $barmtuang){
	$mtuangdf=$barmtuang['kode'];
}


$frm[2]="
	
	
	<fieldset id='listdpal'>
	<legend><b>".$_SESSION['lang']['dpalloc']."</b></legend>	
	<div>
	<table class='sortable' cellspacing='1' border='0' >
	<thead>
	<tr class='rowheader'>
		<th>". $_SESSION['lang']['totaldp']."</th>
		<th></th>
		<th>". $_SESSION['lang']['sisadp']."</th>
		<th></th>
		<th>". $_SESSION['lang']['alkdp']."</th>		
	</tr>
	
	
	</thead>
	<tr class=rowcontent>
	  <td><input type=text id=totaldp class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=20 value=0 onblur=\"change_number(this);\"  style=width:150px; disabled></td>
	  <td></td>
	  <td><input type=text id=sisadp class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=20 value=0 onblur=\"change_number(this);\" style=width:150px; disabled></td>
	  <td></td>
	  <td><input type=text id=alkdp class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=20 value=0 onchange=\"change_number(this);\" onkeyup=\"hitungDP();\" style=width:150px;>&nbsp;</td>	  
	</tr>	
	</table>

	<table class='sortable' cellspacing='1' border='0' >
	<thead>
	<tr class='rowheader'>
		<th>". $_SESSION['lang']['totalrtn']."</th>
		<th></th>
		<th>". $_SESSION['lang']['sisartn']."</th>
		<th></th>
		<th>". $_SESSION['lang']['alkrtn']."</th>		
	</tr>
	
	
	</thead>
	<tr class=rowcontent>
	  <td><input type=text id=totalrtn class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=20 value=0 onchange=\"change_number(this);\"  style=width:150px; disabled ></td>
	  <td></td>
	  <td><input type=text id=sisartn class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=20 value=0 onchange=\"change_number(this);\" style=width:150px; disabled ></td>
	  <td></td>
	  <td><input type=text id=alkrtn class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=20 value=0  onchange=\"change_number(this);\" onkeyup=\"hitungRetensi();\" style=width:150px;>&nbsp;</td>	  
	</tr>	
	</table>
	
	</div>
	<button class='mybutton' onclick='lanjutDP();'>".$_SESSION['lang']['lanjut']."</button>
	</fieldset>
	
	";

$frm[3]="

	<fieldset id='listsummary'>
	<legend><b>".$_SESSION['lang']['summary']."</b></legend>	
	<div>
	<table class='sortable' cellspacing='1' border='0' >
	<thead>
	<tr class='rowheader'>
		<th>". $_SESSION['lang']['total']."</th>
		<th></th>
		<th><!--". $_SESSION['lang']['diskon']."--></th>
		<th></th>
		<th>". $_SESSION['lang']['nett']."</th>		
		<th></th>
		<th>". $_SESSION['lang']['subtotal']."</th>
	</tr>
	
	
	</thead>
	<tr class=rowcontent>
	  <input type=hidden id=totalawal onchange=\"getSelisih();\">
	  <td><input type=text id=total class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=20 value=0 onchange=\"change_number(this);\" onkeyup=\"cekkosong();getSelisih();getNett();hitungPPn();hitungPPh();hitungPBBKB();getSubTotal();getGrandTotal();\"  style=width:150px;></td>
	  <td></td>
	  <td style='width:164px;'><input type=hidden id=diskon class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=20 value=0 onchange=\"change_number(this);\" onkeyup=\"cekkosong();getSelisih();getNett();hitungPPn();hitungPPh();hitungPBBKB();getSubTotal();getGrandTotal();\" style=width:150px;></td>
	  <td></td>
	  <td>&nbsp;<input type=text id=nett class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=20 value=0  onblur=\"change_number(this);\" disabled style=width:150px;>&nbsp;</td>	  
	  <td></td>
	  <td style='width:166px;'><input type=text id=subtotal2 class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=20 value=0  onblur=\"change_number(this);\" disabled style=width:150px;></td>
	</tr>	
	</table>	
	
	<table class='sortable' cellspacing='1' border='0' >
	<thead>
	<tr class='rowheader'>
		<th>". $_SESSION['lang']['ppn']."</th>
		<th></th>
		<th>". $_SESSION['lang']['persen']."</th>
		<th></th>
		<th>". $_SESSION['lang']['nilaippn']."</th>		
		<th></th>
		<!--<th>". $_SESSION['lang']['additional']."</th>-->
		<th>". $_SESSION['lang']['penalti']."</th>
	</tr>
	
	
	</thead>
	<tr class=rowcontent>
	  <td><select id=pilihppn style='width:145px' onchange=\"hitungPPn();getSubTotal();getGrandTotal();\">".$optPpn."</select></td>
	  <td></td>
	  <td><input type=text id=persenppn class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=20 value=0 disabled style=width:150px;></td>
	  <td></td>
	  <td>&nbsp;<input type=text id=nilaippn class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=20 value=0  onblur=\"change_number(this);\" disabled style=width:150px;>&nbsp;</td>	  
	  <td></td>
	  <td style='width:166px;'><input type=text id=additional class=myinputtextnumber onkeypress=\"return angka_doang(event);\" onchange=\"cekkosong();getGrandTotal();\"  onblur=\"change_number(this);\" maxlength=20 value=0 onblur=\"change_number(this);\" style=width:150px;></td>
	</tr>	
	</table>	
	
	<table class='sortable' cellspacing='1' border='0' >
	<thead>
	<tr class='rowheader'>
		<th>". $_SESSION['lang']['pph']."</th>
		<th></th>
		<th>". $_SESSION['lang']['persen']."</th>
		<th></th>
		<th>". $_SESSION['lang']['nilaipph']."</th>		
		<th></th>
		<!--<th>". $_SESSION['lang']['pengurang']."</th>-->
		<th>".$_SESSION['lang']['diskon']."</th>
	</tr>
	
	
	</thead>
	<tr class=rowcontent>
	  <td><select id=pilihpph style='width:145px' onchange=\"hitungPPh();getSubTotal();getGrandTotal();\">".$optPph."</select></td>
	  <td></td>
	  <td><input type=text id=persenpph class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=20 value=0 disabled style=width:150px;></td>
	  <td></td>
	  <td>(<input type=text id=nilaipph class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=20 value=0 onblur=\"change_number(this);\" disabled style=width:150px;>)</td>	  
	  <td></td>
	  <td style='width:162px;'><input type=text id=deduction class=myinputtextnumber onkeypress=\"return angka_doang(event);\" onchange=\"getGrandTotal();\"  onblur=\"change_number(this);\" maxlength=20 value=0 onblur=\"change_number(this);\" style=width:150px;></td>
	</tr>	
	</table>	
	
	<table class='sortable' cellspacing='1' border='0' >
	<thead>
	<tr class='rowheader'>
		<th>". $_SESSION['lang']['pbbkb']."</th>
		<th></th>
		<th>". $_SESSION['lang']['persen']."</th>
		<th></th>
		<th>". $_SESSION['lang']['nilaipbbkb']."</th>		
		<th></th>
		<th>". $_SESSION['lang']['grnd_total']."</th>
	</tr>
	
	
	</thead>
	<tr class=rowcontent>
	  <td><select id=pilihpbbkb style='width:145px' onchange=\"hitungPBBKB();getSubTotal();getGrandTotal();\">".$optPpn."</select></td>
	  <td></td>
	  <td><input type=text id=persenpbbkb class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=20 value=0 disabled style=width:150px;></td>
	  <td></td>
	  <td>&nbsp;<input type=text id=nilaipbbkb class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=20 value=0 onblur=\"change_number(this);\" disabled style=width:150px;>&nbsp;</td>	  
	  <td></td>
	  <td style='width:166px;'><input type=text id=grtotal class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=20 value=0 onblur=\"change_number(this);\" disabled style=width:150px;></td>
	</tr>	
	</table>
	
	<table class='sortable' cellspacing='1' border='0' >
	<thead>
	<tr class='rowheader'>
		<th style='width:165px'></th>
		<th></th>
		<th>". $_SESSION['lang']['selisih']."</th>
		<th></th>
		<th>". $_SESSION['lang']['subtotal']."</th>		
		<th></th>
		<th id=txtkg>". $_SESSION['lang']['kegiatan']."</th>
	</tr>
	
	
	</thead>
	<tr class=rowcontent>
	  <td></td>
	  <td></td>
	  <td><input type=text id=selisih class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=20 value=0 onblur=\"change_number(this);\" disabled style='width:150px;'></td>
	  <td></td>
	  <td>&nbsp;<input type=text id=subtotal1 class=myinputtextnumber onkeypress=\"return angka_doang(event);\" maxlength=20 value=0 onblur=\"change_number(this);\" disabled style='width:150px;'>&nbsp;</td>	  
	  <td></td>
	  <td style='width:166px;'><select id=pilihcoa style='width:145px' disabled>".$optCoa."</select></td>
	</tr>	
	</table>
	
	<span style='float:left;'>".$_SESSION['lang']['terbilang'].":&nbsp; </span> <div id='terbilang' style='background-color:#ffffff;float:left;'></div>
	<br>
	<input hidden=true id=method value='insertHeader'>
	<input hidden=true id=cnfsimpan value='".$_SESSION['lang']['confirmsimpan']."'>
	<input hidden=true id=alsimpan value='".$_SESSION['lang']['alertinsert']."'>
	<input hidden=true id=altdlengkap value='".$_SESSION['lang']['datatidaklengkap']."'>
	<input hidden=true id=dokpo value='".$dokpo."'>
	<input hidden=true id=dokspk value='".$dokspk."'>
	<input hidden=true id=dokbaspk value='".$dokbaspk."'>
	<input hidden=true id=dokln value='".$dokln."'>
	<input hidden=true id=dokcip value='".$dokcip."'>
	<input hidden=true id=dokpibpo value='".$dokpibpo."'>
	<input hidden=true id=coatxt value='".$_SESSION['lang']['coa']."'>
	<input hidden=true id=kgtxt value='".$_SESSION['lang']['kegiatan']."'>
	<input hidden=true id=mtuangdf value='".$mtuangdf."'>
	<button class='mybutton' onclick='simpanHeaderSummary();'>". $_SESSION['lang']['save']."</button>
	<button class='mybutton' onclick='resetSummary();'>".$_SESSION['lang']['reset']."</button>
	</fieldset>	
	";
?>


<fieldset id='form' style='display:none;'>
<legend><b><?php echo $_SESSION['lang']['form'];?></b></legend>
<?php
//========================
$hfrm[0]=$_SESSION['lang']['header'];
$hfrm[1]=$_SESSION['lang']['detailPembelian'];
$hfrm[2]=$_SESSION['lang']['dpalloc'];
$hfrm[3]=$_SESSION['lang']['summary'];
//draw tab, jangan ganti parameter pertama, krn dipakai di javascript
drawTab('FRM',$hfrm,$frm,220,930);
//===============================================	
?>
</fieldset>

<?php
CLOSE_BOX();
echo close_body();
?>