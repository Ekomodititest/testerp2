<?php
require_once('master_validation.php');
include('lib/nangkoelib.php');
include_once('lib/zLib.php');
echo open_body();
include('master_mainMenu.php');
OPEN_BOX('',"<b>Laporan Perencanaan Pembangkit</b>");
?>
<!-- Includes -->
<script language=javascript src='js/traksi_lap_per_pembangkit.js'></script>
<script language="javascript" src="js/zMaster.js"></script>
<?php 
## GET PERUSAHAAN ##
#pre($_SESSION['empl']);
$OptPerusahaan = "<option value=''>".$_SESSION['lang']['pilihdata']."</option>";
$sPerusahaan = "select * from organisasi where tipe='PT' and kodeorganisasi = '".$_SESSION['org']['kodeorganisasi']."';";
#echo $sPerusahaan;
$qPerusahaan = mysql_query($sPerusahaan) or die(mysql_error($conn));
while($rPerusahaan = mysql_fetch_assoc($qPerusahaan)){
    $OptPerusahaan.="<option value='".$rPerusahaan['kodeorganisasi']."'>".$rPerusahaan['namaorganisasi']."</option>";
}

## GET LOKASI ##
$OptLokasi = "<option value=''>".$_SESSION['lang']['pilihdata']."</option>";

## GET TIPE OPERASIONAL ##
$OptTipeOperasional = "<option value=''>".$_SESSION['lang']['pilihdata']."</option>";
$sTipeOperasional = "select * from setup_5parameter where flag='tipeop';";
$qTipeOperasional = mysql_query($sTipeOperasional) or die(mysql_error($conn));
while($rTipeOperasional = mysql_fetch_assoc($qTipeOperasional)){
    $OptTipeOperasional.="<option value='".$rTipeOperasional['kode']."'>".$rTipeOperasional['nama']."</option>";
}

## GET OMS ##
$OptOMS = "<option value=''>".$_SESSION['lang']['pilihdata']."</option>";
$sOMS = "select * from setup_5parameter where flag='traksioms';";
$qOMS = mysql_query($sOMS) or die(mysql_error($conn));
while($rOMS = mysql_fetch_assoc($qOMS)){
    $OptOMS.="<option value='".$rOMS['kode']."'>".$rOMS['nama']."</option>";
}
?>
<fieldset style='clear:both' >
	<legend><b><?php echo $_SESSION['lang']['find']; ?></b></legend>
	
	<table cellpadding=1 cellspacing=1>
		<tr>
			<td><?php echo $_SESSION['lang']['perusahaan']; ?></td>
			<td>:</td>
			<td colspan=4><select id="perusahaan" onchange="GetLokasi()"><? echo $OptPerusahaan; ?></select></td>
		</tr>
		<tr>
			<td><?php echo $_SESSION['lang']['lokasi']; ?></td>
			<td>:</td>
			<td colspan=4><select id="lokasi"><? echo $OptLokasi; ?></select></td>
		</tr>
		<tr>
			<td><?php echo $_SESSION['lang']['tanggal']; ?></td>
			<td>:</td>
			<td><input type="text" id="tanggalawal" class="myinputtext" onmousemove="setCalendar(this.id)" size="10" maxlength="10" /></td>
			<td><?php echo $_SESSION['lang']['sd']; ?></td>
			<td>:</td>
			<td><input type="text" id="tanggalakhir" class="myinputtext" onmousemove="setCalendar(this.id)" size="10" maxlength="10" />&nbsp;</td>
		</tr>
		<tr>
			<td><?php echo $_SESSION['lang']['tipeoperasional']; ?></td>
			<td>:</td>
			<td colspan=4 onchange="CheckOms()"><select id="tipeoperasional"><? echo $OptTipeOperasional; ?></select></td>
		</tr>
		<tr>
			<td><?php echo $_SESSION['lang']['oms']; ?></td>
			<td>:</td>
			<td colspan=4><select id="oms"><? echo $OptOMS; ?></select></td>
		</tr>
		<tr>
			<td>Nama KMA</td>
			<td>:</td>
			<td colspan=4>
				<input id="namakmaheader" name="namakmaheader" class="myinputtext" type="text" maxlength="30" size="30" onkeyup="PopUpSearchItem('Cari Nama KMA', 'GetNamaKMA', event)">
				<input id="kodekmaheader" name="kodekmaheader" class="myinputtext" type="hidden" maxlength="30" size="30">
				<img src="images/search.png" class="dellicon" title="Cari" onclick="PopUpSearchItem('Cari Nama KMA','GetNamaKMA',event)">
			</td>
		</tr>
		<tr>
			<td>Nama Kegiatan</td>
			<td>:</td>
			<td colspan=4><select id="namakegiatanheader"><? echo $OptLokasi; ?></select></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td><button class="mybutton" onclick="DisplayList()"><?php echo $_SESSION['lang']['pilih']; ?></button>
				<button class="mybutton" onclick="window.location.reload()" id='Clear'><?php echo $_SESSION['lang']['clear']; ?></button>
				<button class="mybutton" onclick="DownloadExcel(event,'traksi_slave_get_lap_per_pembangkit.php')"><?php echo $_SESSION['lang']['excel']; ?></button>
				<!--<img onclick=DownloadExcel(event) src=images/pdf.jpg class=resicon title='MS.Excel'></td>
			<td><img onclick=DownloadExcel(event) src=images/excel.jpg class=resicon title='MS.Excel'> </td>-->
			<td>
		</tr>
	</table>
</fieldset>

<fieldset style='clear:both' id='ViewListHeader'>
	<legend><b><?php echo $_SESSION['lang']['list']; ?></b></legend>
	<div id='ListContainer' style='overflow:auto;height:350px;'>
	</div>
</fieldset>
<?
CLOSE_BOX();
echo close_body();
?>