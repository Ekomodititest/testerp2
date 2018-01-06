<?php
require_once('master_validation.php');
require_once('lib/nangkoelib.php');
OPEN_BODY();
?>
<link rel="stylesheet" type="text/css" href="style/zTable.css">
<script language="javascript" src="js/zMaster.js"></script>
<script language='javascript' src='js/zTools.js'></script>
<script language='javascript' src='js/log_spk_new.js'></script>
<?php
include('master_mainMenu.php');
OPEN_BOX();
?>
<fieldset id='listdata'>
<legend><b>BA SPK</b></legend>
<div>
<?php echo $_SESSION['lang']['find']; ?> : 
<select id='filter'>
<option value=''><?php echo $_SESSION['lang']['all'];?></option>
<option value='nospk'>No SPK</option>
</select>
<span id='findword'><?php echo $_SESSION['lang']['keyword']; ?> : </span>
<input type='text' id='keyword' />
<button class='mybutton' onclick='search1()'><?php echo $_SESSION['lang']['find']; ?></button>
<br/><br/>		
<table class='sortable' cellspacing='1' border='0'>
<thead>
<tr class='rowheader'>
	<th><?php echo $_SESSION['lang']['no'];?></th>
	<th><?php echo $_SESSION['lang']['type'];?> SPK</th>
	<th>No SPK</th>
	<th>No Reff Kontrak</th>
	<th>Nilai Kontrak</th>
	<th>Kegiatan</th>
	<th>CIP</th>
	<th>Pihak Pertama</th>
	<th>Pihak Kedua</th>	
	<th>Status</th>
	<th><?php echo $_SESSION['lang']['action'];?></th>
	<th>PDF</th>
</tr>
</thead>
<tbody id='container'>
<script>loadDataBA();</script>
</tbody>
</table>
</div>
</fieldset>
<?php
CLOSE_BOX();
CLOSE_BODY();
?>