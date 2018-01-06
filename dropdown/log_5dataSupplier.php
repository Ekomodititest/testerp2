<?php
require_once('master_validation.php');
include('lib/nangkoelib.php');
echo open_body();
?>
<script language='javascript' src='js/supplier.js'></script>
<script language='javascript' src='js/jquery-1.4.2.min.js'></script>
<script language='javascript' src='js/searchdatagrid.js'></script>
<?php
include('master_mainMenu.php');
OPEN_BOX('','');
 echo"<fieldset>
      <legend><b>Input ".$_SESSION['lang']['supplier']."/".$_SESSION['lang']['kontraktor']."</b></legend>
	  <table>
	  <tr>
	     <td>".$_SESSION['lang']['type']." <img src='images/obl.png'/></td><td><select id=tipe onchange=\"getKelompokSupplier(this.options[this.selectedIndex].value)\"><option value=''></option><option value=SUPPLIER>Supplier</option><option value=KONTRAKTOR>Contractor</option></select></td>
	     <td>".$_SESSION['lang']['telp']."</td><td><input type=text class=myinputtext id=telp onkeypress=\"return tanpa_kutip(event);\" size=30 maxlength=30></td>
	  </tr>
	  <tr>
		  <input type='hidden' value='".$_SESSION['lang']['type']."' id='atype'/>
		  <input type='hidden' value='".$_SESSION['lang']['namasupplier']."' id='anamasupplier'/>
		  <input type='hidden' value='".$_SESSION['lang']['kodekelompok']."' id='akodekelompok'/>	
	      <td>".$_SESSION['lang']['kodekelompok']." <img src='images/obl.png'/></td><td><select id=kdkelompok onchange=\"getSupplierNumber(this.options[this.selectedIndex].value,this.options[this.selectedIndex].text);\"><option value=''></option></select></td>
          <td>".$_SESSION['lang']['fax']."</td><td><input type=text class=myinputtext id=fax onkeypress=\"return tanpa_kutip(event);\" size=30 maxlength=30></td>	  
 	  </tr>
	  <tr>
	      <td>Id.".$_SESSION['lang']['supplier']."/".$_SESSION['lang']['kontraktor']."</td><td><input type=text class=myinputtext disabled id=idsupplier></td>
	      <td>".$_SESSION['lang']['email']."</td><td><input type=text class=myinputtext id=email onkeypress=\"return tanpa_kutip(event);\" size=30 maxlength=30></td>
	  </tr>
	  <tr>
	      <td>".$_SESSION['lang']['namasupplier']." <img src='images/obl.png'/></td><td><input type=text class=myinputtext id=namasupplier onkeypress=\return tanpa_kutip(event);\" size=20 maxlength=45></td>
	      <td>".$_SESSION['lang']['npwp']."</td><td><input type=text class=myinputtext id=npwp onkeypress=\"return tanpa_kutip(event);\" size=30 maxlength=30></td>
	  </tr>
	  <tr>
	      <td>".$_SESSION['lang']['alamat']."</td><td><input type=text class=myinputtext id=alamat onkeypress=\"return tanpa_kutip(event);\" size=50 maxlength=100></td>
	      <td>".$_SESSION['lang']['cperson']."</td><td><input type=text class=myinputtext id=cperson onkeypress=\"return tanpa_kutip(event);\" size=30 maxlength=30></td>
	  </tr>
	  <tr>
	      <td>".$_SESSION['lang']['kota']."</td><td><input type=text class=myinputtext id=kota onkeypress=\"return tanpa_kutip(event);\" size=20 maxlength=30></td>
	      <td>".$_SESSION['lang']['plafon']."</td><td><input type=text  onblur=\"change_number(this);\"class=myinputtextnumber id=plafon onkeypress=\"return angka_doang(event);\" size=15 maxlength=15 value=0></td>
	  </tr>
	  <tr>
		<td></td>
		<td>
			<button class=mybutton onclick=saveSupplier()>".$_SESSION['lang']['save']."</button>
			<button class=mybutton onclick=cancelSupplier()>".$_SESSION['lang']['cancel']."</button>	  		
		</td>
	  </tr>
	  </table>
	  <input type=hidden id=method value=insert>
	  </fieldset>";
?>
<?
//CLOSE_BOX();
//OPEN_BOX('',$_SESSION['lang']['plafon'].': <span id=captiontipe></span> '.$_SESSION['lang']['namakelompok'].':<span id=captionkelompok></span>');
echo "<fieldset>
".$_SESSION['lang']['find']." : <input type='text' id='FilterTextBox' name='FilterTextBox' class='myinputtext'/>
<br/><br/>";
//echo"<span id=captiontipe></span>&nbsp;<span id=captionkelompok></span>";	     
	echo"<div style='width=100%; height:250px;overflow:scroll'>
	     <table class='sortable' id='filterable' cellspacing=1 border=0 >
		 <tr class=rowheader>
	     <th>".$_SESSION['lang']['kodekelompok']."</th>
		 <th>Id.".$_SESSION['lang']['supplier']."</th>
		 <th>".$_SESSION['lang']['namasupplier']."</th>
		 <th>".$_SESSION['lang']['alamat']."</th>
		 <th>".$_SESSION['lang']['cperson']."</th>
		 <th>".$_SESSION['lang']['kota']."</th>
		 <th>".$_SESSION['lang']['telp']."</th>		 
		 <th>".$_SESSION['lang']['fax']."</th>		 
		 <th>".$_SESSION['lang']['email']."</th>		 
		 <th>".$_SESSION['lang']['npwp']."</th>	 
		 <th>".$_SESSION['lang']['plafon']."</th>
		 </tr>";
$str=" select * from ".$dbname.".log_5supplier order by namasupplier asc";
  if($res=mysql_query($str))
  {
	while($bar=mysql_fetch_object($res))
	{
		$no+=1;
		echo "<tr class=rowcontent>
		     <td>".$bar->kodekelompok."</td>
			 <td>".$bar->supplierid."</td>
			 <td>".$bar->namasupplier."</td>
			 <td>".$bar->alamat."</td>
			 <td>".$bar->kontakperson."</td>
			 <td>".$bar->kota."</td>
			 <td>".$bar->telepon."</td>		 
			 <td>".$bar->fax."</td>		 
			 <td>".$bar->email."</td>		 
			 <td>".$bar->npwp."</td>	 
			 <td align=right>".number_format($bar->plafon,0,',','.')."</td>
			  <td><img src=images/application/application_delete.png class=resicon  title='Delete' onclick=\"delSupplier('".$bar->supplierid."','".$bar->namasupplier."');\"></td>
			  <td><img src=images/application/application_edit.png class=resicon  title='Edit' onclick=\"editSupplier('".$bar->supplierid."','".$bar->namasupplier."','".$bar->alamat."','".$bar->kontakperson."','".$bar->kota."','".$bar->telepon."','".$bar->fax."','".$bar->email."','".$bar->npwp."','".$bar->plafon."','".$bar->kodekelompok."');\"></td>
			 </tr>";
	}	 	   	
  }		 
echo "</table>
		 </div>
</fieldset>		 
		 ";

CLOSE_BOX();
echo close_body();
?>