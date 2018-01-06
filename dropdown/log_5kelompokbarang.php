<?php
require_once('master_validation.php');
include('lib/nangkoelib.php');
echo OPEN_BODY();
?>
<script language='javascript' src='js/kelompok_barang.js'></script>
<script language='javascript' src='js/jquery-1.4.2.min.js'></script>
<script language='javascript' src='js/searchdatagrid.js'></script>
<?php
include('master_mainMenu.php');
OPEN_BOX();
echo "<input type='hidden' id='akode' value='".$_SESSION['lang']['materialgroupcode']."'/>";
echo "<input type='hidden' id='anamakelompok' value='".$_SESSION['lang']['namakelompok']."'/>";
echo "<input type='hidden' id='akelompokbiaya' value='".$_SESSION['lang']['kelompokbiaya']."'/>";
$str="select distinct kelompokbiaya from ".$dbname.".keu_5komponenbiaya order by kelompokbiaya asc";
$res=mysql_query($str);
$opt="<option value=''></option>";
while($bar=mysql_fetch_object($res)){
	$opt.="<option value='".$bar->kelompokbiaya."'>".$bar->kelompokbiaya."</option>";
}
echo"<div style='height:530px;overflow:scroll;'>
	<fieldset>
     <legend><b>".$_SESSION['lang']['kelompokbarang']."</b></legend>
	 <table>
	 <tr>
	   <td>".$_SESSION['lang']['materialgroupcode']." <img src='images/obl.png'/></td>
	   <td><input type=text class=myinputtext id=kelnumber size=3 maxlength=3 onkeypress=\"return angka_doang(event);\"></td>
	 </tr>
	 <tr>
	   <td>".$_SESSION['lang']['namakelompok']." <img src='images/obl.png'/></td>
	   <td><input type=text class=myinputtext id=kelname size=60 maxlength=60 onkeypress=\"return tanpa_kutip(event);\"></td>
	 </tr>
	 
	 <!-- <tr>
	   <td>".$_SESSION['lang']['namakelompok']."(EN)</td>
	   <td><input type=text class=myinputtext id=kelname1 size=60 maxlength=60 onkeypress=\"return tanpa_kutip(event);\"></td>
	 </tr> -->
     <tr>
	   <td>".$_SESSION['lang']['kelompokbiaya']." <img src='images/obl.png'/></td>
	   <td><select id=kelompokbiaya>".$opt."</select></td>
	 </tr>	
	 <tr>
	   <td>".$_SESSION['lang']['noakun']."</td>
	   <td><input type=text class=myinputtextnumber id=noakun size=15 maxlength=15 onkeypress=\"return angka_doang(event);\"></td>
	 </tr>
	<tr>
		<td></td>
		<td>
		 <button class=mybutton onclick=saveKelompokBarang()>".$_SESSION['lang']['save']."</button>
		 <button class=mybutton onclick=cancelKelompokBarang()>".$_SESSION['lang']['cancel']."</button>		
		</td>
	</tr>	 
	 </table>
	 <input type=hidden value=insert id=method>
     </fieldset>";
$str="select * from ".$dbname.".log_5klbarang order by kelompok asc";
$res=mysql_query($str);
echo"<fieldset>
<legend><b>".$_SESSION['lang']['list']."</b></legend>
".$_SESSION['lang']['find']." : <input type='text' id='FilterTextBox' name='FilterTextBox'/>
<br/><br/>
<table class='sortable' id='filterable' cellspacing=1 border=0 >
     <thead>
	  <tr class=rowheader>
	   <th>No</th>
	   <th>".$_SESSION['lang']['materialgroupcode']."</th>
	   <th>".$_SESSION['lang']['namakelompok']."</th>
       <!-- <th>".$_SESSION['lang']['namakelompok']."(EN)</th> -->
	   <th>".$_SESSION['lang']['kelompokbiaya']."</th>
	   <th>".$_SESSION['lang']['noakun']."</th>
	   <th>".$_SESSION['lang']['action']."</th>
	  </tr>
	 </thead>
	 <tbody id=container>";
$no=0;	 
while($bar=mysql_fetch_object($res)){
  $no+=1;	
  echo"<tr class=rowcontent>
	   <td>".$no."</td>
	   <td>".$bar->kode."</td>
	   <td>".$bar->kelompok."</td>
       <!-- <td>".$bar->kelompok1."</td> -->
	   <td>".$bar->kelompokbiaya."</td>
	   <td>".$bar->noakun."</td>
		  <td>
		      <img src=images/application/application_edit.png class=resicon  title='Edit' onclick=\"fillField('".$bar->kode."','".$bar->kelompok."','".$bar->kelompokbiaya."','".$bar->noakun."');\"> 
			  <img src=images/application/application_delete.png class=resicon  title='Delete' onclick=\"delKelompok('".$bar->kode."','".$bar->kelompok."');\">
		  </td>	   
	  </tr>";	
}     
echo"</tbody>
	 </table>
	 </fieldset>
	 </div>";
CLOSE_BOX();
echo CLOSE_BODY();
?>