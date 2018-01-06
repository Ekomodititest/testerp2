<?php
require_once('master_validation.php');
include('lib/nangkoelib.php');
echo open_body();
?>
<script language='javascript' src='js/zTools.js'></script>
<script language='javascript' src='js/log_5masterfranco.js'></script>
<script language='javascript' src='js/jquery-1.4.2.min.js'></script>
<script language='javascript' src='js/searchdatagrid.js'></script>
<?php
$arr="##idFranco##nmFranco##almtFranco##cntcPerson##hdnPhn##method";
include('master_mainMenu.php');
OPEN_BOX();
echo"<div style='height:530px;overflow:scroll;'><fieldset>
     <legend><b>Master ".$_SESSION['lang']['franco']."</b></legend>
	 <table>
	 <tr>
	   <td>".$_SESSION['lang']['franco']." <img src='images/obl.png'/></td>
	   <td><input type=text class=myinputtext id=nmFranco name=nmFranco onkeypress=\"return tanpa_kutip(event);\" style=\"width:150px;\" maxlength=100 /></td>
	 </tr>
	 <tr>
	   <td>".$_SESSION['lang']['alamat']." <img src='images/obl.png'/></td>
	   <td><textarea id=almtFranco name=almtFranco></textarea></td>
	 </tr>
	 <tr>
	   <td>".$_SESSION['lang']['cperson']." <img src='images/obl.png'/></td>
	   <td><input type=text class=myinputtext id=cntcPerson name=cntcPerson onkeypress=\"return tanpa_kutip(event);\" style=\"width:150px;\" /> </td>
	 </tr>	
	 <tr>
	   <td>".$_SESSION['lang']['telp']."</td>
	   <td><input type=text class=myinputtext id=hdnPhn name=hdnPhn  onkeypress=\"return angka_doang(event);\" style=\"width:150px;\" maxlength=20></td>
	 </tr>	 
	  <tr>
	   <td>".$_SESSION['lang']['status']."</td>
	   <td><input type='checkbox' id=statFr name=statFr />".$_SESSION['lang']['tidakaktif']."</td>
	 </tr> 
	 <tr>
		<td></td>
		<td>
		 <button class=mybutton onclick=saveFranco('log_slave_5masterfranco','".$arr."')>".$_SESSION['lang']['save']."</button>
		 <button class=mybutton onclick=cancelIsi()>".$_SESSION['lang']['cancel']."</button>		
		</td>
	 </tr>
	 </table>
	 <input type=hidden value=insert id=method>
     </fieldset>
	 <input type='hidden' id=idFranco name=idFranco />";
//CLOSE_BOX();
//OPEN_BOX();
$no=0;	 
$arr=array($_SESSION['lang']['aktif'],$_SESSION['lang']['tidakaktif']);
$str="select * from ".$dbname.".setup_franco order by franco_name asc";
$res=mysql_query($str);
echo"<fieldset><legend>".$_SESSION['lang']['list']."</legend>
".$_SESSION['lang']['find']." : <input type='text' id='FilterTextBox' name='FilterTextBox'/>
<br/><br/>
<table class=sortable cellspacing=1 border=0 id='filterable'>
     <thead>
	  <tr class=rowheader>
	   <th>No</th>
	   <th>".$_SESSION['lang']['franco']."</th>
	   <th>".$_SESSION['lang']['alamat']."</th>
	   <th>".$_SESSION['lang']['cperson']."</th>
	   <th>".$_SESSION['lang']['telp']."</th>
	   <th>".$_SESSION['lang']['status']."</th>
	   <th>".$_SESSION['lang']['action']."</th>
	  </tr>
	 </thead>
	 <tbody id=container>";
		while($bar=mysql_fetch_assoc($res)){
		$no+=1;	
		echo"<tr class=rowcontent>
		<td>".$no."</td>
		<td>".$bar['franco_name']."</td>
		<td>".substr($bar['alamat'],0,50)."</td>
		<td>".$bar['contact']."</td>
		<td>".$bar['handphone']."</td>
		<td>".$arr[$bar['status']]."</td>
		<td>
			  <img src=images/application/application_edit.png class=resicon  title='Edit' onclick=\"fillField('".$bar['id_franco']."');\"> 
			  <img src=images/application/application_delete.png class=resicon  title='Delete' onclick=\"delData('".$bar['id_franco']."');\">
		  </td>
		
		</tr>";	
		}     
echo"</tbody>
     <tfoot>
	 </tfoot>
	 </table></fieldset></div>";
CLOSE_BOX();
echo close_body();
?>