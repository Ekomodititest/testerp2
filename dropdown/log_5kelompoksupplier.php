<?php
require_once('master_validation.php');
include('lib/nangkoelib.php');
echo OPEN_BODY();
?>
<script language='javascript' src='js/jquery-1.4.2.min.js'></script>
<script language='javascript' src='js/searchdatagrid.js'></script>
<script language='javascript' src='js/klsupplier.js'></script>
<?php
include('master_mainMenu.php');
OPEN_BOX();
//default value for the code is supplier
//then ghet max number for supplier
$tipe='SUPPLIER';
$str1="select max(kode) as kode from ".$dbname.".log_5klsupplier";
$res1=mysql_query($str1);
while($bar1=mysql_fetch_object($res1)){
        $kode=$bar1->kode;
}
$kode=substr($kode,1,5);
$newkode=$kode+1;
        switch($newkode){
                case $newkode<10:
                   $newkode='00'.$newkode;
                   break;
                case $newkode<100:
                   $newkode='0'.$newkode;
                   break;
                default:
           $newkode=$newkode;   
                break;     
        }
$newkode='S'.$newkode;
?>
<fieldset>
        <legend>
                <b><?php echo $_SESSION['lang']['suppliergroup'];?></b>
        </legend>
<table>
    <tr>
	<td><input type='hidden' id='type1' value='<?php echo $_SESSION['lang']['type'];?>'/><?php echo $_SESSION['lang']['type'];?> <img src='images/obl.png'/></td>
	<!-- <td><select id='tipe' onchange="getCodeNumber(this.options[this.selectedIndex].value)"><option value='SUPPLIER'>Supplier</option><option value='KONTRAKTOR'>Contractor</option></select></td> -->
	<td><select id='tipe'><option value='SUPPLIER'>Supplier</option><option value='KONTRAKTOR'>Contractor</option></select></td>
	</tr>	
        
	<tr>
	<td><?php echo $_SESSION['lang']['kode'];?></td>
	<td><input type='text' disabled='disabled' value='<?php echo $newkode;?>' class='myinputtext' id='kodespl' onkeypress="return tanpa_kutip(event);" maxlength='10' size='10'></td>
	</tr>
        
	<tr>
	<td><input type='hidden' id='namakelompok1' value='<?php echo $_SESSION['lang']['namakelompok'];?>'/><?php echo $_SESSION['lang']['namakelompok'];?> <img src='images/obl.png'/></td>
	<td><input type='text' class='myinputtext' id='kelompok' onkeypress="return tanpa_kutip(event);" maxlength='40' size='40'></td>
	</tr>
<?php
$zz='namaakun';
$str="select noakun,".$zz." from ".$dbname.".keu_5akun where detail=1 and (noakun like '211%')";
$res=mysql_query($str);
$opt="";
while($bar=mysql_fetch_object($res)){
   $opt.="<option value='".$bar->noakun."'>".$bar->namaakun."</option>";
}	
echo" <tr><td>".$_SESSION['lang']['noakun']."</td><td><select id=akun>".$opt."</select></td></tr>";
?>
<input type='hidden' value='insert' id='method'>
<tr>
<td></td>
<td>
<button class='mybutton' onclick='saveKelSup()'><?echo $_SESSION['lang']['save'];?></button>
<button class='mybutton' onclick='cancelKelSup()'><?echo $_SESSION['lang']['cancel'];?></button>
</td>
</tr>
</table>
</fieldset>
<?
//CLOSE_BOX();
//OPEN_BOX();
?>
<fieldset>
        <legend><b><?php echo $_SESSION['lang']['list'];?></b></legend>
        <div style='width:100%;overflow:scroll;height:300px;'>
<?php echo $_SESSION['lang']['find']; ?> : <input type='text' id='FilterTextBox' name='FilterTextBox'/>
<br/><br/>		
        <table class='sortable' cellspacing='1' border='0' id='filterable'>
                <thead>
                        <tr class='rowheader'>
                                <th><?php echo $_SESSION['lang']['no'];?></th>
                                <th><?php echo $_SESSION['lang']['kode'];?></th>
                                <th><?php echo $_SESSION['lang']['namakelompok'];?></th>
                                <th><?php echo $_SESSION['lang']['type'];?></th>
                                <th><?php echo $_SESSION['lang']['noakun'];?></th>
                                <th><?php echo $_SESSION['lang']['action'];?></th>
                        </tr>
                </thead>
                <tbody id='container'>
<?php
$str=" select * from ".$dbname.".log_5klsupplier order by kelompok asc";
$res=mysql_query($str);

        while($bar=mysql_fetch_object($res)){
                $no+=1;
                echo"<tr class=rowcontent>
                      <td>".$no."</td>
                      <td>".$bar->kode."</td>
                          <td>".$bar->kelompok."</td>
                          <td>".$bar->tipe."</td>
                          <td>".$bar->noakun."</td>
                          <td><img src=images/application/application_delete.png class=resicon  title='Delete' onclick=\"delKlSupplier('".$bar->kode."');\"> <img src=images/application/application_edit.png class=resicon  title='Update' onclick=\"editKlSupplier('".$bar->kode."','".$bar->kelompok."','".$bar->tipe."','".$bar->noakun."');\"></td>
                         </tr>";
        }	 	   	
?>			
                </tbody>
                <tfoot></tfoot>
        </table>
        </div>
</fieldset>	
<?
CLOSE_BOX();
echo close_body();
?>