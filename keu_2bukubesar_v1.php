<?
require_once('master_validation.php');
include('lib/nangkoelib.php');
echo open_body();
?>
<script language=javascript1.2 src="js/keu_laporan.js"></script>
<?
include('master_mainMenu.php');
//echo OPEN_THEME();
//OPEN_BOX('','<b>'.strtoupper($_SESSION['lang']['laporanbukubesar']).'</b>');
OPEN_BOX();

//get existing period
$str="select distinct periode as periode from ".$dbname.".setup_periodeakuntansi where length(periode)>4
      order by periode desc";
	  
$res=mysql_query($str);
#$optper="<option value=''>".$_SESSION['lang']['sekarang']."</option>";
$optper="";
while($bar=mysql_fetch_object($res))
{
	$optper.="<option value='".$bar->periode."'>".substr($bar->periode,5,2)."-".substr($bar->periode,0,4)."</option>";
}

    $str="select kodeorganisasi,namaorganisasi from ".$dbname.".organisasi
              where tipe='PT' and kodeorganisasi = '".$_SESSION['empl']['kodeorganisasi']."'
                  order by namaorganisasi";
 
  $res=mysql_query($str);
        $optpt="";
        while($bar=mysql_fetch_object($res))
        {
                $optpt.="<option value='".$bar->kodeorganisasi."'>".$bar->namaorganisasi."</option>";
		}
        $optgudang="";

	/*if($_SESSION['empl']['lokasitugas']==$_SESSION['org']['kodepusat'])
	{  
		$str="select DISTINCT a.kodeorganisasi,a.namaorganisasi from ".$dbname.".organisasi a,".$dbname.".organisasi b
			where (a.tipe='KEBUN' or a.tipe='PABRIK' or a.tipe='KANWIL'
			or a.tipe='HOLDING')  and a.induk!='' AND a.induk=b.induk  AND b.kodeorganisasi='".$_SESSION['empl']['lokasitugas']."'
			";						
	}else{
		$str="select DISTINCT a.kodeorganisasi,a.namaorganisasi from ".$dbname.".organisasi a
			where (a.tipe='KEBUN' or a.tipe='PABRIK' or a.tipe='KANWIL'
			or a.tipe='HOLDING')  and a.induk!='' AND a.kodeorganisasi='".$_SESSION['empl']['lokasitugas']."'
			";						
	}*/
	
	//rubah ==Jo 06-06-2017==
	if($_SESSION['empl']['pusat']==1){
		$str="select DISTINCT a.kodeorganisasi,a.namaorganisasi from ".$dbname.".organisasi a
			left join ".$dbname.".organisasitipe b on a.tipe=b.tipe
			where (b.isKebun=1 or b.isPabrik=1 or b.isKanwil=1
			or b.isHolding=1)  and a.induk!='' and a.alokasi='".$_SESSION['empl']['kodeorganisasi']."'";
		$optgudang.="<option value=''>".$_SESSION['lang']['all']."</option>";
	}
	else{
		$str="select DISTINCT a.kodeorganisasi,a.namaorganisasi from ".$dbname.".organisasi a
			left join ".$dbname.".organisasitipe b on a.tipe=b.tipe
			where (b.isKebun=1 or b.isPabrik=1 or b.isKanwil=1
			or b.isHolding=1)  and a.induk!='' and a.kodeorganisasi='".$_SESSION['empl']['lokasitugas']."'";
	}
    $res=mysql_query($str);
        while($bar=mysql_fetch_object($res))
        {
                $optgudang.="<option value='".$bar->kodeorganisasi."'>".$bar->namaorganisasi."</option>";

        }

		//rubah syarat jadi detail=1 ==Jo 03-04-2017==
        $str="select noakun,namaakun from ".$dbname.".keu_5akun
                        where detail = '1'
                        order by noakun
                        ";
        $res=mysql_query($str);

        $optakun="<option value=''></option>";
        while($bar=mysql_fetch_object($res))
        {
                $optakun.="<option value='".$bar->noakun."'>".$bar->noakun." - ".$bar->namaakun."</option>";

        }
		$qwe="01-".date("m-Y");
		
	
	
?>
<fieldset>
<legend><b><?php echo $_SESSION['lang']['laporanbukubesar']?></b></legend>
<table cellspacing="1" border="0" >
<tr><td><label><?php echo $_SESSION['lang']['pt']?></label></td><td><select id=pt style='width:200px;'  onchange=ambilAnakBB(this.options[this.selectedIndex].value)><?php echo $optpt; ?></select></tr>
<tr><td><label><?php echo $_SESSION['lang']['unit']?></label></td><td><select id=gudang style='width:200px;' onchange=hideById('printPanel')><?php echo $optgudang; ?></select></td></tr>

<tr><td><label><?php echo $_SESSION['lang']['tanggalmulai']?></label></td><td><input type="text" class="myinputtext" id="tgl1" name="tgl1" onchange="cekTanggal1(this.value);" onmousemove="setCalendar(this.id)" onkeypress="return false;"  maxlength="10" style="width:150px;" value="<?php echo $qwe; ?>" /></td></tr>
<tr><td><label><?php echo $_SESSION['lang']['tanggalsampai']?></label></td><td><input type="text" class="myinputtext" id="tgl2" name="tgl2" onchange="cekTanggal2(this.value);" onmousemove="setCalendar(this.id)" onkeypress="return false;"  maxlength="10" style="width:150px;" /></td></tr>
<!--<tr>
<td><label><?php echo $_SESSION['lang']['noakundari']?></label></td>
<td><input type=text disabled=disabled  id=accountid name=accountid class=myinputtext style='width:150px;' onchange=numchange() maxlength=100/><img class='dellicon' src='images/zoom.png' onclick=searchpil(event,1) />
<input type=text disabled=disabled id=accountname name=accountname class=myinputtext style='width:300px;'  onchange=numchange() maxlength=100/> 
</td>
</tr>

<tr>
<td><label><?php echo $_SESSION['lang']['noakunsampai']?></label></td>
<td><input type=text disabled=disabled  id=accountids name=accountids class=myinputtext style='width:150px;' onchange=numchange() maxlength=100/><img class='dellicon' src='images/zoom.png' onclick=searchpil(event,2) />
<input type=text disabled=disabled id=accountnames name=accountnames class=myinputtext style='width:300px;'  onchange=numchange() maxlength=100/> 
</td>
</tr>-->
<!--<tr><td><label><?php echo $_SESSION['lang']['noakundari']?></label></td><td><select id=akundari style='width:200px;' onchange=ambilAkun2(this.options[this.selectedIndex].value)><?php echo $optakun; ?></select></td></tr>
<tr><td><label><?php echo $_SESSION['lang']['noakunsampai']?></label></td><td><select id=akunsampai style='width:200px;' onchange=hideById('printPanel')><option value=""></option></select></td></tr>-->

<tr>
<td><label><?php echo $_SESSION['lang']['noakun']?></label></td>
<td><input type=text  id=accid name='accid' class=myinputtext style='width:150px;' onkeyup='searchAkun()' maxlength=100/><img class='dellicon' src='images/zoom.png' onclick='searchAkun()' />

<button class=mybutton onclick=plsmAkun()><?php echo $_SESSION['lang']['pilihsmua']?></button>
<button class=mybutton onclick=hapusAkun()><?php echo $_SESSION['lang']['hpspilihan']?></button>
</td>
</tr>

<tr>
<td></td>
<td>
<div style='margin-left:10px;'>
	<table id='detailpo' class='sortable' cellspacing='1' border='0'>
	<thead>
	<tr class='rowheader'>
			<th width='20px'><?php echo $_SESSION['lang']['no'] ?></th>
			<th width='76px'><?php echo $_SESSION['lang']['noakun'] ?></th>
			<th width='330px'><?php echo $_SESSION['lang']['namaakun'] ?></th>
			<th ><?php echo $_SESSION['lang']['action'] ?></th>
		
	</tr>
	</thead>
	</table>
</div>
<div style='margin-left:10px;max-height:200px;overflow:scroll'>
	
	<table id='detailpo' class='sortable' cellspacing='1' border='0'>
	
	<tbody id='containerac'>
	<?php
	//untuk ambil akun2 ==Jo 10-05-2017==
	$slinduk="select induk from organisasi where kodeorganisasi='".$_SESSION['empl']['lokasitugas']."'";
	$resinduk=$eksi->sSQL($slinduk);
	foreach($resinduk as $barinduk){
		$kodeinduks=$barinduk['induk'];
	}
	$strac="SELECT noakun,namaakun FROM keu_5akun WHERE pemilik in('".$kodeinduks."','".$_SESSION['lang']['defaultglobal']."') ";
	$no=0;
	$resakun=$eksi->sSQL($strac);
	foreach($resakun as $barakun){
		$no+=1;
		$slcek="select noakun from keu_akun_bukubesar_temp where noakun='".$barakun['noakun']."'";
		$jmcek=$eksi->sSQLnum($slcek);
		if($jmcek>0){
			$slt="checked";
		}
		else{
			$slt="";
		}
		echo"<tr class=rowcontent>
		  <td width=20px>".$no."</td>
		  <td width=75px>".$barakun['noakun']."</td>
		  <td width=330px>".$barakun['namaakun']."</td>
		  <td><input id=chk_".$no." ".$slt." type='checkbox' onchange=addAcc('".$no."','".$barakun['noakun']."')  ></td>
		  </tr>";
	}
	?>
	</tbody>
	</table>
 </div>
</td>

</tr>

<tr height="20"><td colspan="2"> <button class=mybutton onclick=getLaporanBukuBesarv1()><?php echo $_SESSION['lang']['proses'] ?></button></td></tr>

<tr>

</tr>

</table>
</fieldset>
<?
//CLOSE_BOX();
//OPEN_BOX();
echo"<span id=printPanel style='display:none;'>
     <img onclick=jurnalv1KeExcel(event,'keu_laporanBukuBesarv1_Excel.php') src=images/excel.jpg class=resicon title='MS.Excel'> 
	 <img onclick=jurnalv1KePDF(event,'keu_laporanBukuBesarv1_pdf.php') title='PDF' class=resicon src=images/pdf.jpg>
	 </span>    
         <div style='width:1100px;display:fixed;'>
       <table class=sortable cellspacing=1 border=0 width=1080px>
	     <thead>
		    <tr>
			  <td align=center style='width:40px;'>".$_SESSION['lang']['nomor']."</td>
			  <td align=center style='width:100px;'>".$_SESSION['lang']['nojurnal']."</td>
			  <td align=center style='width:80px;'>".$_SESSION['lang']['tanggal']."</td>
			  <td align=center style='width:100px;'>".$_SESSION['lang']['noakun']."</td>
			  <td align=center style='width:250px;'>".$_SESSION['lang']['keterangan']."</td>
			  <td align=center style='width:100px;'>".$_SESSION['lang']['debet']."</td>
			  <td align=center style='width:100px;'>".$_SESSION['lang']['kredit']."</td>
			  <td align=center style='width:100px;'>".$_SESSION['lang']['saldo']."</td>
			  <td align=center style='width:50px;'>".$_SESSION['lang']['kodeorg']."</td>
			  <!--<td align=center style='width:100px;'>".$_SESSION['lang']['kodeblok']."</td>
			  <td align=center style='width:40px;'>".$_SESSION['lang']['tahuntanam']."</td>-->
			</tr>  
		 </thead>
		 <tbody>
		 </tbody>
		 <tfoot>
		 </tfoot>		 
	   </table>
     </div>
     <div style='width:1100px;height:359px;overflow:scroll;'>
           <table class=sortable cellspacing=1 border=0 width=1080px style='display:fixed'>
                 <thead>
				 </thead>
                      
                     <tbody id=container>
                     </tbody>
                     <tfoot>
                     </tfoot>		 
               </table>
         </div>";
CLOSE_BOX();
//echo CLOSE_THEME();
close_body();
?>