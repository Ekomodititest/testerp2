<?php
require_once('master_validation.php');
include('lib/nangkoelib.php');
echo OPEN_BODY();
?>
<script language='javascript' src='js/konversi.js'></script>
<script language='javascript' src='js/jquery-1.4.2.min.js'></script>
<script language='javascript' src='js/searchdatagrid.js'></script>
<?php
include('master_mainMenu.php');
OPEN_BOX();
echo"<div style='height:530px;overflow:scroll;'><fieldset>
     <legend><b>".$_SESSION['lang']['uomconversion']."</b></legend>
	 <table>
	 <tr>
	    <td>".$_SESSION['lang']['materialname']."</td>
		<td>
		<span id=kodebarang></span>
		<input type=text id=namadisabled size=50 class=myinputtext disabled>
		<img src=images/search.png class=dellicon title='".$_SESSION['lang']['find']."' onclick=\"searchBarang('".$_SESSION['lang']['findmaterial']."','<fieldset><legend>".$_SESSION['lang']['findmaterial']."</legend>".$_SESSION['lang']['find']."<input type=text class=myinputtext id=namabrg><button class=mybutton onclick=findBarang()>".$_SESSION['lang']['find']."</button></fieldset><div id=container></div>',event);\">
		</td>
	 </tr> 
	 </table>
     </fieldset>";
//CLOSE_BOX();
//OPEN_BOX();

$hasil='';
$str="SELECT * FROM ".$dbname.".setup_satuan";
$res=mysql_query($str);    
while($bar=mysql_fetch_object($res)){
	$hasil.="<option value='".$bar->satuan."'>".$bar->satuan."</option>";
}
	
echo"<fieldset>
     <legend><b>".$_SESSION['lang']['newconversion'].":</b></legend>
	 ".$_SESSION['lang']['materialname'].": <b><span id=captionbarang></span></b><br>
	 ".$_SESSION['lang']['smallestuom'].": <b><span id=captionsatuan></span></b><br>
	 ".$_SESSION['lang']['uomsource']." 1<input type=text class=myinputtext id=satuansource disabled size=10 maxlength=10 onkeypress=\"return tanpa_kutip(event);\">
	 = <input type=text class=myinputtextnumber id=jumlah size=8 maxlength=8 onkeypress=\"return angka_doang(event);\">
         ".$_SESSION['lang']['satuan']."<select id=satuandest>$hasil</select>
	 ".$_SESSION['lang']['keterangan']." <input type=text class=myinputtext id=keterangan size=25 maxlength=30 onkeypress=\"return tanpa_kutip(event);\">
     <input type=hidden value=insert id=method>
	 <button class=mybutton onclick=simpanKonversi()>".$_SESSION['lang']['save']."</button>
	 <button class=mybutton onclick=batalKonversi()>".$_SESSION['lang']['cancel']."</button>
	 </fieldset>";
//CLOSE_BOX();

//OPEN_BOX();
echo"<fieldset>
     <legend><b>".$_SESSION['lang']['conversionlist']."</b></legend>
	 ".$_SESSION['lang']['materialname'].": <b><span id=captionbarang1></span></b><br>
	 ".$_SESSION['lang']['smallestuom'].": <b><span id=captionsatuan1></span></b>
	 <table class=sortable cellspacing=1 border=0>
	 <thead>
	 <tr class=rowheader>
	 <td>No.</td>
	 <td>".$_SESSION['lang']['uomsource']."</td>
	 <td>".$_SESSION['lang']['uomdestination']."</td>
	 <td>".$_SESSION['lang']['jumlah']."</td>
	 <td>".$_SESSION['lang']['keterangan']."</td>
	 <td></td>
	 </tr>
	 </thead>
	 <tbody id=containersatuan>
	 </tbody>
	 </table>
     </fieldset>";
$zz='kelompok';
$str="select kode,".$zz." from ".$dbname.".log_5klbarang order by kelompok asc";
$res=mysql_query($str);
$optkelompok="<option value=''></option>";
while($bar=mysql_fetch_object($res)){
	$optkelompok.="<option value='".$bar->kode."'>".$bar->kelompok." [ ".$bar->kode." ] </option>";
}
echo"<fieldset>
     <legend><b>".$_SESSION['lang']['daftarbarang']."</b></legend>
      ".$_SESSION['lang']['pilihdata']." <select id=kelompok onchange=ambilBarang(this.options[this.selectedIndex].value)>".$optkelompok."</select> 
".$_SESSION['lang']['find']." : <input type='text' id='FilterTextBox' name='FilterTextBox'/>
<br/><br/>	  
     <div style='height:300px;width:600px;overflow:scroll'>	 	 
     <table class=sortable cellspacing=1 border=0 id='filterable'>
     <thead>
         <tr class=rowheader>
         <th>No.</th>
         <th>".$_SESSION['lang']['kodebarang']."</th>
         <th>".$_SESSION['lang']['namabarang']."</th>
         <th>".$_SESSION['lang']['satuan']."</th>
         <th>".$_SESSION['lang']['ke']." ".$_SESSION['lang']['satuan']."</th>
         <th>Vol</th>
		 <!-- <th>".$_SESSION['lang']['action']."</th> -->
         </tr>
         </thead>
	 <tbody id=containerdetail>";
$str="select a.*,b.namabarang,b.satuan as satuanori from ".$dbname.".log_5stkonversi a left join ".$dbname.".log_5masterbarang b on a.kodebarang=b.kodebarang order by namabarang asc";
$res=mysql_query($str);
$no=0;
while($bar=mysql_fetch_object($res)){  
$no+=1;
    echo "<tr class=rowcontent>
         <td>".$no."</td>
         <td>".$bar->kodebarang."</td>
         <td>".$bar->namabarang."</td>
         <td>".$bar->satuanori."</td>
         <td>".$bar->satuankonversi."</td>
         <td align=right>".$bar->jumlah."</td>
		 <!-- <td><img src=images/application/application_delete.png class=resicon  title='".$_SESSION['lang']['delete']."' onclick=\"delConversi('".$bar->kodebarang."','".$bar->darisatuan."','".$bar->satuankonversi."');\"></td> -->
         </tr>";
}
    echo"</tbody>
	 </table>
	 </div>
     </fieldset></div>";
CLOSE_BOX();
echo CLOSE_BODY();
?>