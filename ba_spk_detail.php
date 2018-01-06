<?php
require_once('master_validation.php');
require_once('lib/nangkoelib.php');
OPEN_BODY();
?>
<link rel="stylesheet" type="text/css" href="style/zTable.css">
<script language="javascript" src="js/zMaster.js"></script>
<script language='javascript' src='js/zTools.js'></script>
<script language='javascript' src='js/log_spk_new.js'></script>
<script>
function calculate1(){
	var ppnpersen = document.getElementById('ppn').value;
	var Arrppnpersen = ppnpersen.split("-");
	var hasilppnpersen = Arrppnpersen[1]/100;
	
	var pphpersen = document.getElementById('pph').value;
	var Arrpphpersen = pphpersen.split("-");
	var hasilpphpersen = Arrpphpersen[1]/100;

	var dppSpk = remove_comma(document.getElementById('nominaldpp'));	
	var hslhitungppn = dppSpk*hasilppnpersen;
	document.getElementById('nominalppn').value = parseFloat(hslhitungppn);
	change_number(document.getElementById('nominalppn'));	
		
	var hslhitungpph = dppSpk*hasilpphpersen;
	document.getElementById('nominalpph').value = parseFloat(hslhitungpph);
	change_number(document.getElementById('nominalpph'));

	var hasilTotalNilaiSPK = parseFloat(dppSpk) + parseFloat(hslhitungppn) - parseFloat(hslhitungpph);
	document.getElementById('nominaltotal').value = hasilTotalNilaiSPK;
	change_number(document.getElementById('nominaltotal'));

	var nominaltotal = remove_comma(document.getElementById('nominaltotal'));
	var dp = document.getElementById('persen').value/100;
	var hsltotaldp = nominaltotal*dp;
	
	/* document.getElementById('nilaidp').value = parseFloat(hsltotaldp);
	change_number(document.getElementById('nilaidp'));	*/					
}

function changeFormat1(){
	change_number(document.getElementById('nominaldpp'));
}

function calculateTotalDP1(){
	var persen = document.getElementById('persen').value;
	
	if(persen > 100) {
		alert('tidak boleh melebihi 100%');
		document.getElementById("submit").disabled = true;
		document.getElementById('persen').value=0;
	} 
	else {
		var nominaltotal = remove_comma(document.getElementById('nominaltotal'));
		var dp = document.getElementById('persen').value/100;
		var hsltotaldp = nominaltotal*dp;
		/* document.getElementById('nilaidp').value = parseFloat(hsltotaldp);
		change_number(document.getElementById('nilaidp'));			
		document.getElementById("submit").disabled = false; */
	}	
}

function getDpp(){
	var nilaibapersen = document.getElementById('persen').value;
	var myppnpersen = document.getElementById('ppn').value;
	var myppnarrpersen = myppnpersen.split("-");
	var hasilppnpersen = myppnarrpersen[1]/100;
	
	var mypphpersen = document.getElementById('pph').value;
	var mypphpersenarr = mypphpersen.split("-");
	var hasilpphpersen = mypphpersenarr[1]/100;	
		
	var nominaltotal = remove_comma(document.getElementById('nominaltotal'));	
	dpp =0;
	document.getElementById('nominaldpp').value =0;
	if (nilaibapersen>0){
		dpp = nominaltotal/(1+(hasilppnpersen-hasilpphpersen));
	}
	document.getElementById('nominaldpp').value = parseFloat(dpp);
	change_number(document.getElementById('nominaldpp'));			
}

function calculateTotal1(){
	getDpp()	
	var mystr = document.getElementById('ppn').value;
	var myarr = mystr.split("-");
	var ppn = myarr[1]/100;		
	var nilaispk1 = remove_comma(document.getElementById('nominaldpp'));	
	var hslppn1 = nilaispk1*ppn;
	document.getElementById('nominalppn').value = parseFloat(hslppn1);
	change_number(document.getElementById('nominalppn'));

	var mystr1 = document.getElementById('pph').value;
	var myarr1 = mystr1.split("-");
	var pph1 = myarr1[1]/100;	
	var nilaispk2= remove_comma(document.getElementById('nominaldpp'));	
	var hslpph1 = nilaispk2*pph1;
	document.getElementById('nominalpph').value = parseFloat(hslpph1);
	change_number(document.getElementById('nominalpph'));		
	
	var nominaltotal = remove_comma(document.getElementById('nominaltotal'));
	var dp = document.getElementById('persen').value/100;
	var hsltotaldp = nominaltotal*dp;
	/* document.getElementById('nilaidp').value = parseFloat(hsltotaldp);
	change_number(document.getElementById('nilaidp'));	*/
}

function calculateTotalBA(){
var totalpersen = document.getElementById('persen').value + document.getElementById('persen1').value	
	if(document.getElementById('persen').value==0){
		document.getElementById('nominaldpp').value = 0;//document.getElementById('hitdpp').value;
		document.getElementById('nominalppn').value = 0;//document.getElementById('hitppn').value;
		document.getElementById('nominalpph').value = 0;//document.getElementById('hitpph').value;
		document.getElementById('nominaltotal').value = 0;	
		document.getElementById('konversi').value = 0;	
	} 				
	else {		
		if(document.getElementById('persen').value > 100){
			alert("Tidak boleh melebihi 100%");
			document.getElementById('persen').value = 0;
		} 				
		else {			
			var a = remove_comma(document.getElementById('nilaispk'));
			var b = remove_comma(document.getElementById('persen'))/100;
			var c = a*b;
			document.getElementById('nominaltotal').value = parseFloat(c);
			change_number(document.getElementById('nominaltotal'));	
			
			var ppnpersen = document.getElementById('ppn').value;
			var myppnarr = ppnpersen.split("-");
			var e = myppnarr[1]/100;	
			
			var pphpersen = document.getElementById('pph').value;	
			var myppharr = pphpersen.split("-");
			var f = myppharr[1]/100;
			var d = 0;
			document.getElementById('nominaldpp').value =0;
			if(b>0){
				d = c/(1+(e-f));
			}
			
			document.getElementById('nominaldpp').value = parseFloat(d);
			change_number(document.getElementById('nominaldpp'));	
			
			document.getElementById('nominalppn').value = parseFloat(e*d);
			change_number(document.getElementById('nominalppn'));

			document.getElementById('nominalpph').value = parseFloat(f*d);
			change_number(document.getElementById('nominalpph'));		

			var nominal = remove_comma(document.getElementById('nominaltotal'));
			var kurs = remove_comma(document.getElementById('kurs'));
			
			document.getElementById('konversi').value = parseFloat(nominal*kurs);
			change_number(document.getElementById('konversi'));				
		}
	}
}

function calculatePersen(){
	var a = remove_comma(document.getElementById('persen'));
	var b = remove_comma(document.getElementById('persen2'));
	document.getElementById('persen1').value = parseFloat(a)+parseFloat(b);
	change_number(document.getElementById('persen1'));		
	
	if(document.getElementById('persen1').value > 100){
		alert("Total Persentase Pekerjaan tidak boleh melebihi 100%");
		document.getElementById('persen1').value = document.getElementById('persen2').value;
		document.getElementById('persen').value = 0;	
		document.getElementById('nominaldpp').value = 0;//document.getElementById('hitdpp').value;
		document.getElementById('nominalppn').value = 0;//document.getElementById('hitppn').value;
		document.getElementById('nominalpph').value = 0;//document.getElementById('hitpph').value;
		document.getElementById('nominaltotal').value = 0;	
		document.getElementById('konversi').value = 0;		
	}	
}
</script>
<?php
include('master_mainMenu.php');
OPEN_BOX();
$frm[0]='';
$frm[1]='';
$strspk = "select complete from ".$dbname.".log_spkht_new where nospk='".$_GET['nospk']."'";
$resspk = mysql_query($strspk);
$barspk = mysql_fetch_object($resspk);	
if($barspk->complete == 1) { 
	$cek = "disabled";
} 
else {
	$cek = "";
}
?>
<fieldset>
<legend><b>Berita Acara SPK</b></legend>
<table>
<tr>
<td><a href="ba_spk.php"><img class='delliconBig' src='images/orgicon.png' title='<?php echo $_SESSION['lang']['list'];?>'></a></td>
</tr>
<tr>
<td><?php echo $_SESSION['lang']['list'];?></td>
</tr>
</table>

<fieldset>
<legend><b>Header</b></legend>
<table>
<tr>
<td>No Surat Perintah Kerja</td>
<td>:</td>
<td id='spkno'><?php echo $_GET['nospk'];?></td>
</tr>
<tr>
<td>Tipe SPK</td>
<td>:</td>
<td><?php echo $_GET['tipe'];?></td>
</tr>
<tr>
<td>Nama Pekerjaan</td>
<td>:</td>
<td><?php echo $_GET['nmkerja'];?></td>
</tr>
<tr>
<td>Total Nilai </td>
<td>:</td>
<td><?php echo $_GET['mu'].' '.number_format($_GET['nilaispk'],2);?> <input type='hidden' id='nilaispk' value="<?php echo $_GET['nilaispk'];?>"/></td>
</tr>
</table>
</fieldset>

<?php 
$optMu="<option value=''></option>";
$strMu = "select kode,matauang from ".$dbname.".setup_matauang";
$resMu=mysql_query($strMu);
while($bar=mysql_fetch_object($resMu)){
   if($_GET['mu']==$bar->kode) { $select="selected";} else { $select="";}		
   $optMu.="<option value='".$bar->kode."' ".$select.">".$bar->kode." - ".$bar->matauang."</option>";
}

$optMu1="<option value=''></option>";
$strMu1= "select kode,matauang from ".$dbname.".setup_matauang";
$resMu1=mysql_query($strMu1);
while($bar=mysql_fetch_object($resMu1)){
   if($_GET['muspk']==$bar->kode) { $select="selected";} else { $select="";}	
   $optMu1.="<option value='".$bar->kode."' ".$select.">".$bar->kode." - ".$bar->matauang."</option>";
}

$optPpn="<option value='0-0'>".$_SESSION['lang']['pilih']."</option>";
$strPpn = "select kode,nama,rate,deskripsi from ".$dbname.".log_master_pajak where tipe='VAT'";
$resPpn=mysql_query($strPpn);
while($bar=mysql_fetch_object($resPpn)){
   if($_GET['ppnpersen']==$bar->kode."-".$bar->rate) { $select="selected";} else { $select="";}
   $optPpn.="<option value='".$bar->kode."-".$bar->rate."' ".$select.">".$bar->deskripsi."</option>";
}

$optPph="<option value='0-0'>".$_SESSION['lang']['pilih']."</option>";
$strPph = "select kode,nama,rate,deskripsi from ".$dbname.".log_master_pajak where tipe='WHT'";
$resPph=mysql_query($strPph);
while($bar=mysql_fetch_object($resPph)){
   if($_GET['pphpersen']==$bar->kode."-".$bar->rate) { $select="selected";} else { $select="";}
   $optPph.="<option value='".$bar->kode."-".$bar->rate."' ".$select.">".$bar->deskripsi."</option>";
}

$totalPersen = 0;
$strTotalPersen = mysql_query("SELECT sum(persen) as persen FROM `log_spk_ba` WHERE spk='".$_GET['nospk']."'");
while($bar=mysql_fetch_object($strTotalPersen)){
	$totalPersen = $bar->persen;
}

$frm[0].="
<input type='hidden' id=persen2 value=$totalPersen>
<fieldset>
<legend><b>Detail</b></legend>
<div>
<div style='float:left'>
<table>
<tr>
<td><span id='lbl_namaba'>Nama BA</span> <img src='images/obl.png'/></td>
<td>:</td>
<td><input type='text' id='namaba' size='30' $cek /></td>
</tr>
<tr>
<td><span id='lbl_tanggal'>Tanggal BA<span> <img src='images/obl.png'/></td>
<td>:</td>
<td><input type='text' id='tglba' onmousemove='setCalendar(this.id)' readonly='readonly'></td>
</tr>
<tr>
<td>Persentase Pekerjaan</td>
<td>:</td>
<td><input type='text' class='myinputtextnumber' $cek; id='persen' maxlength='3' onkeypress='return angka_doang(event);' value=0 onblur='change_number(this);calculateTotalBA(); calculatePersen();' size='5'/> %</td>
</tr>
<tr>
<td>Total Persentase Pekerjaan</td>
<td>:</td>
<td><input type='text' id=persen1 class='myinputtextnumber' maxlength='3' size='5' disabled value=$totalPersen> %</td>
</tr>
<tr>
<td>Deskripsi</td>
<td>:</td>
<td><textarea id='deskripsi' cols='20' rows='5' $cek></textarea></td>
</tr>
<tr>
<td>	
</td>
<td></td>
<td>
<input type='hidden' id='id' value='0'>
<input type='hidden' id='method' value='saveba'>
<button class='mybutton' onclick='saveba();' id='submit'>".$_SESSION['lang']['save']."</button>	
<button class='mybutton' onclick='cancelba();'>".$_SESSION['lang']['cancel']."</button>
</td>
</tr>
</table>
</div>
<div style='float:left; margin-left:10px;'>
<fieldset>
<legend>Nilai BA SPK</legend>
<table>
<tr>
<td>Mata Uang</td>
<td>:</td>
<td><select id='dppba' disabled style='width:120px;'>".$optMu."</select></td>
<td>Total Nilai</td>
<td>:</td>
<td><input type='text' disabled id='nominaltotal' $cek class='myinputtextnumber' onkeypress='return angka_doang(event)' value=0 onblur='change_number(this)' onkeyup='calculateTotal1()'/></td>
</tr>
<tr>
<td>Kurs</td>
<td>:</td>
<td><input type='text' id='kurs' style='width:120px;' disabled value=1></td>
<td>Total Nilai Konversi</td>
<td>:</td>
<td><input type='text' id='konversi' disabled $cek class='myinputtextnumber' value=0 /></td>
</tr>
<tr>
<td>DPP</td>
<td>:</td>
<td>
<input type='text' disabled id='nominaldpp' style='width:120px;' class='myinputtextnumber' value='0' onkeypress='return angka_doang(event);' value='0' onkeyup='calculate1();' onchange='changeFormat1();'> 
<input type='hidden' value='".number_format($_GET['nilai'],2)."' id='hitdpp'>
</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>PPN</td>
<td>:</td>
<td colspan=3><select id='ppn' disabled style='width:120px;' $cek onchange='calculate1()'>".$optPpn."</select> 
<input type='text' value='0' disabled id='nominalppn' onkeypress='return angka_doang(event)' class='myinputtextnumber'/> <input type='hidden' value='".number_format($_GET['nilaippn'],2)."' id='hitppn'></td>
</tr>
<tr>
<td>PPH</td>
<td>:</td>
<td colspan=3><select id='pph'  disabled style='width:120px;' $cek onchange='calculate1()'>".$optPph.";?></select> 
<input type='text' disabled value='0' disabled id='nominalpph' onkeypress='return angka_doang(event)' class='myinputtextnumber'/> <input type='hidden' value='".number_format($_GET['nilaipph'],2)."' id='hitpph'></td>
</tr>

</table>
</fieldset>
</div>
</div>
</fieldset>";
$frm[1].="<fieldset>
<table class='sortable' cellspacing='1' border='0'>
<thead>
<tr class='rowheader'>
		<th>".$_SESSION['lang']['no']."</th>
		<th>No SPK</th>
		<th>".$_SESSION['lang']['type']." SPK</th>		
		<th>Nama Pekerjaan</th>		
		<th>Nama BA</th>
		<th>Persentase</th>
		<th>DPP BA</th>
		<th>PPN</th>
		<th>PPH</th>
		<th>Total BA</th>
		<th>".$_SESSION['lang']['edit']."</th>
		<th>".$_SESSION['lang']['delete']."</th>		
		<th>Link</th>
		<th>Print</th>
		<th hidden='hidden'>id</th>
</tr>
</thead>
<tbody id='contain'>
<script>loadDetailBA();</script>
</tbody>
</table></fieldset>";
$hfrm[0]=$_SESSION['lang']['form'];
$hfrm[1]=$_SESSION['lang']['list'];
drawTab('FRM',$hfrm,$frm,200,1000);
?>
<input type='hidden' value='0' id='tipeba'/>
<select id='totalba' hidden disabled style='width:120px;'><?php echo $optMu;?></select> 
</fieldset>
<?php
CLOSE_BOX();
CLOSE_BODY();
?>