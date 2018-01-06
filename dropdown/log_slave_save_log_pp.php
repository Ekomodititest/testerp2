<?php
require_once('master_validation.php');
require_once('config/connection.php');
include('lib/nangkoelib.php');
include_once('lib/zLib.php');

//$optNm 		= makeOption($dbname, 'log_5klbarang', 'kode, kelompok');
//$optNmBrg	= makeOption($dbname, 'log_5masterbarang', 'kodebarang, namabarang');
$nopp		= $_POST['rnopp'];
$tanggal	= tanggalsystem($_POST['rtgl_pp']);
$kodeorg	= $_POST['rkd_bag'];
$method		= $_POST['method'];
$user_id	= $_POST['usr_id'];
$nopp2		= $_POST['dnopp'];
$stat_cls	= $_POST['stat'];
$tgl		= date('Ymd');
$bln 		= substr($tgl,4,2);
$thn 		= substr($tgl,0,4);

switch($method){
		case 'delete':
			if ($mysqli->connect_errno) {
				printf("Connect failed: %s\n", $mysqli->connect_error);
				exit();
			}					
			$mysqli->begin_transaction();
			$mysqli->query("delete from ".$dbname.".log_prapoht where nopp='".$nopp."'");
			$mysqli->query("delete from ".$dbname.".log_prapodt where nopp='".$nopp."'");
			$mysqli->commit();
			$mysqli->close();		
			echo $_SESSION['lang']['alertdelete'];
		break;
		
		case 'update':
			$strx="update ".$dbname.".log_prapoht set tanggal='".$tanggal."',kodeorg='".$kodeorg."' where nopp='".$nopp."'";
			if(mysql_query($strx)) {
				echo $_SESSION['lang']['alertupdate'];
			} 
			else {
				echo $_SESSION['lang']['alertfail']." : ".addslashes(mysql_error($conn));
			}					
		break;	
		
		case 'insert':	
			if($nopp==''){
				echo $_SESSION['lang']['alertfail']." : ". $_SESSION['lang']['undefinepr'];
				exit();
			}
			else{
					$sorg="select induk from ".$dbname.".organisasi where kodeorganisasi='".$kodeorg."'";
					$qorg=mysql_query($sorg) or die(mysql_error());
					$rorg=mysql_fetch_assoc($qorg);
					$kd_org=$rorg['induk'];
					$strx="insert into ".$dbname.".log_prapoht(`nopp`, `kodeorg`, `tanggal`,`dibuat`) values('".$nopp."','".$kd_org."','".$tanggal."','".$user_id."')";
					if(mysql_query($strx)) {
						echo $_SESSION['lang']['alertinsert'];
					} else {
						echo $_SESSION['lang']['alertfail']." : ".addslashes(mysql_error($conn));
					}					
			}
		break;
		
		case 'delete_temp':		
			$strx="delete from ".$dbname.".log_prapoht where nopp='".$nopp2."'";	
			if(mysql_query($strx)) {
				echo $_SESSION['lang']['alertdelete'];
			} else {
				echo $_SESSION['lang']['alertfail']." : ".addslashes(mysql_error($conn));
			}					
		break;
		
		case 'insert_persetujuan':
			$sql="SELECT close, hasilpersetujuan1 FROM ".$dbname.".`log_prapoht` WHERE `nopp`='".$nopp."' ";
			$query=mysql_query($sql) or die(mysql_error());
			$rest=mysql_fetch_assoc($query);
					if($rest['close']>1){
							echo"Warning: Status closed, Can't update the status";
							exit();
					}
					 elseif(($rest['hasilpersetujuan1']<1)){
							$stat_cls=1;
							$strx="update ".$dbname.".log_prapoht set persetujuan1='".$user_id."',close='".$stat_cls."'  where nopp='".$nopp."'";
							if(mysql_query($strx)){
								/*
								$to=getUserEmail($user_id);
									$namakaryawan=getNamaKaryawan($_SESSION['standard']['userid']);
									if($_SESSION['language']=='EN'){    
										$subject="[Notifikasi] PR Submission for approval, submitted by: ".$namakaryawan;
										$body="<html>
												 <head>
												 <body>
												   <dd>Dear Sir/Madam,</dd><br/>
												   <br/>
												   Today, ".date('d-m-Y').",  on behalf of ".$namakaryawan." submit a PR, requesting for your approval. To follow up, please follow the link below.
												   <br/>
												   <br/>
												   <br/>
												   Regards,<br/>
												   eKomoditi Solutions Indonesia.
												 </body>
												 </head>
											   </html>
											   ";
									}else{
										$subject="[Notifikasi]Persetujuan PR a/n ".$namakaryawan;
										$body="<html>
												 <head>
												 <body>
												   <dd>Dengan Hormat,</dd><br/>
												   <br/>
												   Pada hari ini, tanggal ".date('d-m-Y')." karyawan a/n  ".$namakaryawan." mengajukan Permintaan Pembelian Barang
												   kepada bapak/ibu. Untuk menindak-lanjuti, silahkan ikuti link dibawah.
												   <br/>
												   <br/>
												   <br/>
												   Regards,<br/>
												   eKomoditi Solutions Indonesia.
												 </body>
												 </head>
											   </html>
											   ";                                            
									}
									$kirim=kirimEmail($to,$subject,$body);
									*/
							}
							else
							echo " Gagal,".addslashes(mysql_error($conn));

					} 
					else{
							echo"Warning: Documents already in the process";
							exit();
					}
		break;
		
		case 'cari_nopp':
			if($tanggal==''){
				$strx="select * from ".$dbname.".log_prapoht where nopp='".$nopp."'";
			}
			elseif($nopp==''){	
				$strx="select * from ".$dbname.".log_prapoht where nopp='".$nopp."' or tanggal like '%".$tanggal."%'";}
			else{
				$strx="select * from ".$dbname.".log_prapoht where nopp='".$nopp."' and tanggal = '".$tanggal."'";
			} 
		break;
		
		case 'cek_pembuat_pp':
				$user_id=$_SESSION['standard']['userid'];
				$skry="select dibuat from ".$dbname.".log_prapoht where nopp='".$nopp."'";
				$qkry=mysql_query($skry) or die(mysql_error());
				$rkry=mysql_fetch_assoc($qkry);
				if($rkry['dibuat']!=$user_id){
					echo "warning: Please see your Username";
					exit();
				}
		break;
		
		case'refresh_data':
			$limit=20;
			$page=0;
			if(isset($_POST['page'])){
			$page=$_POST['page'];
			if($page<0)
			$page=0;
			}
			$offset=$page*$limit;
			if($_SESSION['empl']['tipelokasitugas']== $_SESSION['org']['kodeho']){
				$sCek="select bagian from ".$dbname.".datakaryawan where karyawanid='".$_SESSION['standard']['userid']."'";
				$qCek=mysql_query($sCek) or die(mysql_error($conn));
				$rCek=mysql_fetch_assoc($qCek);
				if($rCek['bagian']=='PUR'){
					$sql="select count(kodeorg) jmlhrow from ".$dbname.".log_prapoht order by tanggal desc";
					$str="select nopp,dibuat,close, hasilpersetujuan1, hasilpersetujuan2, hasilpersetujuan3, hasilpersetujuan4, hasilpersetujuan5, tglp1, tanggal, persetujuan1, persetujuan2, persetujuan3, persetujuan4, persetujuan5 from ".$dbname.".log_prapoht order by tanggal desc, nopp desc limit ".$offset.",".$limit." ";
				}
				else{
					$sql="select count(kodeorg) jmlhrow from ".$dbname.".log_prapoht where dibuat='".$_SESSION['standard']['userid']."' order by tanggal desc";
					$str="select nopp,dibuat,close, hasilpersetujuan1, hasilpersetujuan2, hasilpersetujuan3, hasilpersetujuan4, hasilpersetujuan5, tglp1, tanggal, persetujuan1, persetujuan2, persetujuan3, persetujuan4, persetujuan5 from ".$dbname.".log_prapoht where  dibuat='".$_SESSION['standard']['userid']."' order by tanggal desc,nopp desc limit ".$offset.",".$limit." ";
				}
			} 
			else{
					$sql="select count(kodeorg) jmlhrow from ".$dbname.".log_prapoht where substring(nopp,16,4)='".$_SESSION['empl']['lokasitugas']."'";
					$str="select nopp,dibuat,close, hasilpersetujuan1, hasilpersetujuan2, hasilpersetujuan3, hasilpersetujuan4, hasilpersetujuan5, tglp1, tanggal, persetujuan1, persetujuan2, persetujuan3, persetujuan4, persetujuan5 from ".$dbname.".log_prapoht where substring(nopp,16,4)='".$_SESSION['empl']['lokasitugas']."' order by tanggal desc, nopp desc limit ".$offset.",".$limit."";
			}
			$query=mysql_query($sql) or die(mysql_error());
			while($jsl=mysql_fetch_object($query)){
			$jlhbrs= $jsl->jmlhrow;
		}

 // echo $str;
  if($res=mysql_query($str)){
		while($bar=mysql_fetch_assoc($res)){
				$koderorg=substr($bar['nopp'],15,4);//substring(nopp,16,4)$bar['kodeorg'];
				$spr="select namaorganisasi from  ".$dbname.".organisasi where  kodeorganisasi='".$koderorg."' or induk='".$koderorg."'"; //echo $spr;
				$rep=mysql_query($spr) or die(mysql_error($conn));
				$bas=mysql_fetch_assoc($rep);
				$skry="select karyawanid,namakaryawan from ".$dbname.".datakaryawan where karyawanid='".$bar['dibuat']."'";
				$qkry=mysql_query($skry) or die(mysql_error());
				$rkry=mysql_fetch_assoc($qkry);
				$cekPt=substr($bar->nopp,12,4);
				/*if(($cekPt==$_SESSION['empl']['kodeorganisasi'])||($cekPt==$_SESSION['empl']['lokasitugas']))
				{*/
				$no+=1;

				if($bar['close']=='0'){
						$b="<a href=# id=seeprog onclick=frm_ajun('".$bar['nopp']."','".$bar['close']."') title=\"Click untuk mengubah status\">Need Approval</a>";
						//$b="Need Approval";
				}
				elseif($bar['close']=='1'){
						//$b="<a href=# id=seeprog onclick=frm_ajun('".$bar['nopp']."','".$bar['close']."') title=\"Menunggu Keputusan\">Waiting Approval</a>";
						$b="Waiting Approval";	
				}
				elseif($bar['close']=='2'){
						for($i=0;$i<6;$i++){
								if($bar['hasilpersetujuan'.$i]==1){	
										//$b="<a href=# id=seeprog  title=\"Available\">".$_SESSION['lang']['disetujui']."</a>";
										$b="".$_SESSION['lang']['disetujui']."";
								}
								elseif($bar['hasilpersetujuan'.$i]==3){
										//$b="<a href=# id=seeprog  title=\"Not Available\">".$_SESSION['lang']['ditolak']."</a>";
										$b="".$_SESSION['lang']['ditolak']."";
								}
						}
				}
				$ed_kd_org=substr($bar['nopp'],15,4);
				if($bar['tglp1']=='')
				{$stTgl='0';}
				else{
						$stTgl=5;
				}
				echo"<tr class=rowcontent id='tr_".$no."'>
						  <td>".$no."</td>
						  <td>".$bar['nopp']."</td>
						  <td>".tanggalnormal($bar['tanggal'])."</td>
						  <td>".$bas['namaorganisasi']."</td>
						  <td>".$rkry['namakaryawan']."</td>
						  <td>".$b."</td>";
						  if($bar['dibuat']==$_SESSION['standard']['userid']){
							echo "<td>";
							  if($bar['close']=='1'){
								  echo "<a href=# id=seeprog onclick=alerteditdelete()><img src=images/application/application_edit.png class=resicon  title='Edit'/></a>";
								  echo "<a href=# id=seeprog onclick=alerteditdelete()><img src=images/application/application_delete.png class=resicon  title='Delete'/></a>"; 	
							  }		
								else {
									echo "<img src=images/application/application_edit.png class=resicon  title='Edit' onclick=\"fillField('".$bar['nopp']."','".tanggalnormal($bar['tanggal'])."','".$ed_kd_org."','".$bar['close']."','".$stTgl."');\">";
									echo "<img src=images/application/application_delete.png class=resicon  title='Delete' onclick=\"delPp('".$bar['nopp']."','".$bar['close']."','".$stTgl."');\">";									
								}							  
							echo"<img onclick=\"previewDetail('".$bar['nopp']."',event);\" title=\"Detail PR\" class=\"resicon\" src=\"images/zoom.png\"><img src=images/pdf.jpg class=resicon  title='Print' onclick=\"masterPDF('log_prapoht','".$bar['nopp']."','','log_slave_print_log_pp',event);\">
							</td>";
						  }
						  else{
						  echo"<td><img onclick=\"previewDetail('".$bar['nopp']."',event);\" title=\"Detail PR\" class=\"resicon\" src=\"images/zoom.png\">
						  <img src=images/pdf.jpg class=resicon  title='Print' onclick=\"masterPDF('log_prapoht','".$bar['nopp']."','','log_slave_print_log_pp',event);\"></td>";
						  }

		}	 	 
				echo"</tr>
						 <tr><td colspan=7 align=center>
						".(($page*$limit)+1)." to ".(($page+1)*$limit)." Of ".  $jlhbrs."
						<br />
						<button class=mybutton onclick=cariBast(".($page-1).");>".$_SESSION['lang']['pref']."</button>
						<button class=mybutton onclick=cariBast(".($page+1).");>".$_SESSION['lang']['lanjut']."</button>
						</td>
						</tr>";
		}	
		else {echo " Gagal,".(mysql_error($conn));}	
		break;
		
		case'getDetailPP':		
		echo"<script language=\"javascript\" src=\"js/log_pp.js\"></script>";
		echo"<div style='width:750px;overflow:scroll;'>
			<table border=0 cellspacing=1 class=sortable width=1200px>
		<thead>
		<tr><td>".$_SESSION['lang']['tanggal']." PR</td><td>".$_SESSION['lang']['dbuat_oleh']."</td>";
		for($i=1;$i<6;$i++){
			echo"<td>".$_SESSION['lang']['persetujuan']." ".$i."</td>";
		}
		echo"</tr>
		</thead>
		<tbody>";
		$sPP="select dibuat, tanggal, tglp1,tglp2,tglp3,tglp4,tglp5, persetujuan1,persetujuan2,persetujuan3,persetujuan4,persetujuan5, hasilpersetujuan1,hasilpersetujuan2,hasilpersetujuan3,hasilpersetujuan4,hasilpersetujuan5, komentar1,komentar2,komentar3,komentar4,komentar5 from ".$dbname.".log_prapoht where nopp='".$nopp."'";
		$qPP=mysql_query($sPP) or die(mysql_error($conn));
		while($bar=mysql_fetch_assoc($qPP))
		{
				$sql="select namakaryawan from ".$dbname.".datakaryawan where karyawanid='".$bar['dibuat']."'";
				$query=mysql_query($sql) or die(mysql_error());
				$ret=mysql_fetch_assoc($query);
				echo"<tr class=rowcontent><td>".tanggalnormal($bar['tanggal'])."</td><td>".$ret['namakaryawan']."</td>";
				$arrHsl=array("0"=>$_SESSION['lang']['wait_approval'],"1"=>$_SESSION['lang']['disetujui'],"3"=>$_SESSION['lang']['ditolak']);
						 for($i=1;$i<6;$i++)
						 {
								if($bar['tglp'.$i]!='')
								{
										$tngl=$bar['tglp'.$i];
								}
								if(($bar['persetujuan'.$i]!='')&&($bar['persetujuan'.$i]!=0))
								{	
										$kr=$bar['persetujuan'.$i];
										$sql="select namakaryawan from ".$dbname.".datakaryawan where karyawanid='".$kr."'";
										$query=mysql_query($sql) or die(mysql_error());
										$yrs=mysql_fetch_assoc($query);
										echo"<td>
										".$yrs['namakaryawan']."<br />
										Status : ".$arrHsl[$bar['hasilpersetujuan'.$i]]."<br/> 
										Alasan : ".$bar['komentar'.$i]." <br/> 
										Tanggal : ".tanggalnormal($tngl)."</td>";
								}
								else
								{
										echo"<td></td>";
								}
						 }				 
				echo"</tr>";
		}
		echo"
		</tbody>
		</table>
		<br />
		";
		echo"
		<table border=0 cellspacing=1 class=sortable width=1200px>
		<thead>
		<tr style='align:center; color:#fff;'>
		<th>No</th>
		<th>".$_SESSION['lang']['namabarang']."</th>
		<th>CIP</th>
		<th>".$_SESSION['lang']['satuan']."</th>
		<th>".$_SESSION['lang']['jmlhDiminta']."</th>
		<th>".$_SESSION['lang']['tanggal']." PR</th>
		<th>".$_SESSION['lang']['tgldibutuhkan']."</th>   
		<th>".$_SESSION['lang']['remainingdays']."</th>
		<th>".$_SESSION['lang']['status']." PR</th>		
		<th>".$_SESSION['lang']['locationcode']."</th>
		<th>".$_SESSION['lang']['jumlahverifikasi']."</th>    
		<th>".$_SESSION['lang']['nopo']."</th>
		<th>".$_SESSION['lang']['tanggal']." PO</th>
		<th>".$_SESSION['lang']['realisasi']."</th>
		<th>".$_SESSION['lang']['outstanding']."</th>
		<th>".$_SESSION['lang']['status']." PO Release</th>
		<th>".$_SESSION['lang']['status']." PO</th>	
		</tr>
		</thead>";

		$sdhi=date('Y-m-d');
		$sCek="select nopp from ".$dbname.".log_prapodt where nopp='".$nopp."'";
		$qCek=mysql_query($sCek) or die(mysql_error());
		$rCek=mysql_num_rows($qCek);
		if($rCek>0){
		echo"
		<tbody>";
				$sDet="select a.*,b.tanggal from ".$dbname.".log_prapodt a left join ".$dbname.".log_prapoht b on a.nopp=b.nopp where a.nopp='".$nopp."'";
				$qDet=mysql_query($sDet) or die(mysql_error());
				$lokasi=array("Pusat","Lokal");
				while($res=mysql_fetch_assoc($qDet)){
						$thnAnggaran=substr($res['tanggal'],0,4);
						$unitAnggaran=substr($nopp,15,4);
						$awalthn=$thnAnggaran."-01-01";
						$sBrg="select namabarang,satuan from ".$dbname.".log_5masterbarang where kodebarang='".$res['kodebarang']."'";
						$qBrg=mysql_query($sBrg) or die(mysql_error());
						$rBrg=mysql_fetch_assoc($qBrg);

						$sPoDet="select nopo from ".$dbname.".log_podt where nopp='".$res['nopp']."' and kodebarang='".$res['kodebarang']."'";
						$qPoDet=mysql_query($sPoDet) or die(mysql_error());
						$rCek=mysql_num_rows($qPoDet);
						$sAnggaran="select sum(jumlah) as jmlhAnggaran from ".$dbname.".bgt_budget_detail where 
							kodebarang='".$res['kodebarang']."' and tahunbudget='".substr($res['tanggal'],0,4)."' and kodeorg like '".substr($nopp,15,4)."%' group by kodebarang";
					   // echo $sAnggaran;
						$qAnggaran=mysql_query($sAnggaran) or die(mysql_error($conn));
						$rAnggaran=mysql_fetch_assoc($qAnggaran);

						$sSdhi="select sum(jumlahpesan) as sdhi from ".$dbname.".log_po_vw 
							where nopp like '%".substr($nopp,15,4)."%' and kodebarang='".$res['kodebarang']."'
							 and substr(tanggal,1,4)='".$thnAnggaran."'";
						//echo $sSdhi;
						$qDhi=mysql_query($sSdhi) or die(mysql_error($conn));
						$rDphi=mysql_fetch_assoc($qDhi);

						if($rCek>0){
								//echo"warning:A";
								$rPoDet=mysql_fetch_assoc($qPoDet);
								$sPo="select tanggal from ".$dbname.".log_poht where nopo='".$rPoDet['nopo']."'";
								$qPo=mysql_query($sPo) or die(mysql_error());
								$rPo=mysql_fetch_assoc($qPo);
								$Tgl2=$rPo['tanggal'];
								$tgl1=$res['tanggal'];
								$pecah1 = explode("-", $tgl1);
								$date1 = $pecah1[2];
								$month1 = $pecah1[1];
								$year1 = $pecah1[0];
								//$tgl1 = $bar->tanggal;

								$pecah2 = explode("-", $Tgl2);
								$date2 = $pecah2[2];
								$month2 = $pecah2[1];
								$year2 =  $pecah2[0];
								$stat=1;
								$nopo=$rPoDet['nopo'];
								$tglPo=tanggalnormal($rPo['tanggal']);

						}
						else{	
								//echo"B";
								$tgl1=$res['tanggal'];
								$pecah1 = explode("-", $tgl1);
								$date1 = $pecah1[2];
								$month1 = $pecah1[1];
								$year1 = $pecah1[0];
								//$tgl1 = $bar->tanggal;
								$tgl1 =$tGl1.$tGl2.$tGl3;
								$Tgl2 = date('Y-m-d');			
								$pecah2 = explode("-", $Tgl2);
								$date2 = $pecah2[2];
								$month2 = $pecah2[1];
								$year2 =  $pecah2[0];	
								$stat=0;	
								$nopo="";				
						}

						$jd1 = GregorianToJD($month1, $date1, $year1);
						$jd2 = GregorianToJD($month2, $date2, $year2);
						
						$sdtdate = explode("-", $res['tgl_sdt']);
						$tglsdt = $sdtdate[2];
						$blnsdt = $sdtdate[1];
						$thnsdt = $sdtdate[0];	
												
						$today   = explode("-", date('Y-m-d'));
						$tglini  = $today[2];
						$blnini  = $today[1];
						$thnini  = $today[0];
						
						$gre1 = GregorianToJD($blnsdt, $tglsdt, $thnsdt);
						$gre2 = GregorianToJD($blnini, $tglini, $thnini);
						
						$no+=1;
						//$tolak=array("0"=>$_SESSION['lang']['disetujui'],"3"=>);
						/*
							0 Belum verifikasi
							1 Verifikasi
							
							2 Sebagian PO
							3 ditolak							
							4 PO komplit								
						*/
$stat2="-";							
if($res['status']=='3'){
	$stat2=$_SESSION['lang']['ditolak'];														
}
else if($res['status']=='2'){
	$stat2="VeriSebagian PO";
}
else if($res['status']=='1'){
	$stat2="Sudah Terverifikasi";
}
else if($res['status']=='0'){
	$stat2="Dalam proses";
}			
else if($res['status']=='4'){
	$stat2="PO komplit";
}						

$snopo="select statuspo, stat_release from ".$dbname.".log_poht where nopo='".$nopo."'";
$qnopo=mysql_query($snopo) or die(mysql_error());
$rnopo=mysql_fetch_assoc($qnopo);
// 0=belum selesai'1=sudah selesai dan diajukan;2=sudah dapat di kirim(persetujuan selesai); 3 barang sudah ada yang masuk gudang
$nopoo1 = "-";
if(empty($rnopo['statuspo'])) { 
	$nopoo1 = "-";
} else if($rnopo['statuspo'] == 0) {
	$nopoo1 = "belum selesai"; 					
} else if($rnopo['statuspo'] == 1){
	$nopoo1 = "sudah selesai dan diajukan";
} else if($rnopo['statuspo'] == 2) {
	$nopoo1 = "sudah dapat dikirim";
} else if($rnopo['statuspo'] == 3) {
	$nopoo1 = "barang masuk gudang";
} 

if(empty($rnopo['stat_release'])) { 
	$statrelease = "-";
} else if ($rnopo['stat_release'] == 0) {
	$statrelease = "belum";
} else {
	$statrelease = "sudah";
}

$qdcip="select nocip from ".$dbname.".log_cipdt where nopp='".$nopp."'";
$qcip=mysql_query($qdcip) or die(mysql_error());
$rcip=mysql_fetch_assoc($qcip);
if(empty($rcip['nocip'])) { $nocip = "-";} else { $nocip = $rcip['nocip'];}

$qheader="select hasilpersetujuan1 from ".$dbname.".log_prapoht where nopp='".$nopp."'";
$qheader1=mysql_query($qheader) or die(mysql_error());
$rheader=mysql_fetch_row($qheader1);
$jmlHari=0;
if ($gre1 - $gre2 >=0){
	$jmlHari= $gre1 - $gre2;
}
$lokasibeli = $lokasi[$res['lokalpusat']];
$jmlRealisasi = number_format($rDphi['sdhi'],0);
$nopow = $nopo;
$podate = $tglPo;
$realisasi = $res['realisasi'];
$outstanding = $rDphi['sdhi'] - $res['realisasi'];	
/*
if($res['status']=='3' || $rheader["hasilpersetujuan1"] == 0 || $rheader["hasilpersetujuan2"] == 0 || $rheader["hasilpersetujuan3"] == 0 || $rheader["hasilpersetujuan4"] == 0 || $rheader["hasilpersetujuan5"] == 0){
	$jmlHari= '-';			
	$lokasibeli = '-';
	$jmlRealisasi = '-';
	$nopow='-';
	$podate = '-';
	$realisasi = '-';
	$outstanding = '-';				
}
*/					
//echo"<tr class=rowcontent style='cursor:pointer;' onclick=detailAnggaran('".$res['kodebarang']."','".$thnAnggaran."','".$unitAnggaran."')>
echo"<tr class=rowcontent>	
<td>".$no."</td>						
<td>".$rBrg['namabarang']."</td>
<td>".$nocip."</td>
<td>".$rBrg['satuan']."</td>
<td align=center>".$res['jumlah']."</td>
<td align=center>".tanggalnormal($res['tanggal'])."</td>
<td align=center>".tanggalnormal($res['tgl_sdt'])."</td> 
<td align=center>".$jmlHari."</td>	
<td align=center>".$stat2."</td>	
<td align=center>".$lokasibeli."</td>
<td align=center>".$jmlRealisasi."</td>
<td align='center'>".$nopow."</td>
<td align='center'>".$podate."</td>
<td align=center>".$realisasi."</td>                                												
<td align='center'>".$outstanding."</td>
<td align='center'>".$nopoo1."</td>
<td align='center'>".$statrelease."</td>						
</tr>";
}

		echo"</tbody></table></div><br />";
		echo"<div id=dtFormDetail style=\"overflow:auto; width:500px;height:150px;\">";

		echo"</div>";
		}
		else
		{
				echo"<tbody><tr><td colspan=10>Not Found</td></tr></tbody></table>";
		}

		break;
		case'getAnggaran':
			$optNm 		= makeOption($dbname, 'log_5klbarang', 'kode, kelompok');
			$optNmBrg	= makeOption($dbname, 'log_5masterbarang', 'kodebarang, namabarang');
			$tab.="<fieldset style=width:400px;><legend>Detail ".$optNm[substr($_POST['kdBarang'],0,3)]."</legend>
				<table cellpadding=1 cellspacing=1 border=0 class=sortable><thead>";
			$tab.="<tr><td>".$optNm[substr($_POST['kdBarang'],0,3)]."</td>";
			$tab.="<td>".$_SESSION['lang']['realisasi']."</td><td>".$_SESSION['lang']['budget']."</td><td>".$_SESSION['lang']['sisa']."</td></tr></thead><tbody>";
		$sData="select sum(jumlah) as jmlh,kodebarang from ".$dbname.".bgt_budget_detail where kodebarang like '".substr($_POST['kdBarang'],0,3)."%'
				and tahunbudget='".$_POST['thnAnggaran']."' and kodeorg like '".$_POST['unit']."' group by kodebarang";
		$qData=mysql_query($sData) or die(mysql_error($conn));
		$row=mysql_num_rows($qData);
		if($row==0)
		{
			$tab.="<tr class=rowcontent><td colspan=4>".$_SESSION['lang']['dataempty']."</td></tr>";
		}
		else {			
			while($rData=mysql_fetch_assoc($qData)){
				$sSdhi="select sum(jumlahpesan) as sdhi from ".$dbname.". log_po_vw
						where nopp like '%".$_POST['unit']."%' and kodebarang='".$rData['kodebarang']."'
						and substr(tanggal,1,4)='".$_POST['thnAnggaran']."'";
				$qSdhi=mysql_query($sSdhi) or die(mysql_error($conn));
				$rSdhi=mysql_fetch_assoc($qSdhi);
				$sisaData=$rData['jmlh']-$rSdhi['sdhi'];
				$tab.="<tr class=rowcontent>";
				$tab.="<td>".$optNmBrg[$rData['kodebarang']]."</td>";
				$tab.="<td align=right>".number_format($rSdhi['sdhi'],2)."</td>";
				$tab.="<td align=right>".number_format($rData['jmlh'],2)."</td>";
				$tab.="<td align=right>".number_format($sisaData,2)."</td></tr>";
			}
		}
		$tab.="</tbody></table></fieldset>";
		echo $tab;
		break;
		case'cariBarangDlmDtBs':
			$txtfind = $_POST['txtfind'];
			$str="select kodebarang, namabarang, satuan from ".$dbname.".log_5masterbarang where namabarang like '%".$txtfind."%' ";
			$str.=" UNION ALL select kodebarang, namabarang, satuan from ".$dbname.".log_5masterbarang where kodebarang like '%".$txtfind."%' ";
			if($res=mysql_query($str)){
			
			echo"
  <fieldset>
<legend></legend>
<div style=\"overflow:auto; height:300px;\" >
<table class=data cellspacing=1 cellpadding=2 border=0>
						 <thead>
						 <tr class=rowheader>
						 <td>No</td>
						 <td>".$_SESSION['lang']['kodebarang']."</td>
						 <td>".$_SESSION['lang']['namabarang']."</td>
						 <td>".$_SESSION['lang']['satuan']."</td>
						 <td>".$_SESSION['lang']['saldo']."</td>
						 </tr>
						 </thead>
						 <tbody>";
				$no=0;	 
				while($bar=mysql_fetch_object($res)){
				$no+=1;
		//===========================pengambilan saldo
		//ambil saldo barang
	$saldoqty=0;
	/*
	$str1="select sum(ifnull(saldoqty,0)) as saldoqty from ".$dbname.".log_5masterbarangdt 
	inner join organisasi on kodegudang = kodeorganisasi
	where kodebarang='".$bar->kodebarang."' and induk='".$_SESSION['empl']['lokasitugas']."'";
	*/
	$str1="select sum(ifnull(saldoqty,0)) as saldoqty from ".$dbname.".log_5masterbarangdt 
	where kodegudang LIKE '".substr($_SESSION['empl']['lokasitugas'],0,4)."%'
	AND kodebarang='".$bar->kodebarang."'";
	$res1=mysql_query($str1);
	while($bar1=mysql_fetch_object($res1)){
		$saldoqty=$bar1->saldoqty;
	}
	
	//ambil pemasukan barang yang belum di posting
	$qtynotpostedin=0;
	$str2="select sum(ifnull(b.jumlah,0)) as jumlah,b.kodebarang 
	FROM ".$dbname.".log_transaksiht a 
	left join ".$dbname.".log_transaksidt b on a.notransaksi=b.notransaksi 
	where kodept LIKE '".substr($_SESSION['empl']['lokasitugas'],0,4)."%' and b.kodebarang='".$bar->kodebarang."' and a.tipetransaksi<5 and a.post=0 group by kodebarang";

	$res2=mysql_query($str2);
	while($bar2=mysql_fetch_object($res2)){
			$qtynotpostedin=$bar2->jumlah;
	}
	if($qtynotpostedin=='')
	   $qtynotpostedin=0;

	//ambil pengeluaran barang yang belum di posting
	$qtynotposted=0;
	$str2="select sum(ifnull(b.jumlah,0)) as jumlah,b.kodebarang 
	FROM ".$dbname.".log_transaksiht a 
	left join ".$dbname.".log_transaksidt b on a.notransaksi=b.notransaksi
	where kodegudang LIKE '".substr($_SESSION['empl']['lokasitugas'],0,4)."%' and b.kodebarang='".$bar->kodebarang."' and a.tipetransaksi>4 and a.post=0 group by kodebarang";

	$res2=mysql_query($str2);
	while($bar2=mysql_fetch_object($res2)){
			$qtynotposted=$bar2->jumlah;
	}
	if($qtynotposted=='')
	   $qtynotposted=0;
	$saldoqty=($saldoqty+$qtynotpostedin)-$qtynotposted;
//============================================		

		if($bar->inactive==1)
		{
			echo"<tr bgcolor='red' style='cursor:pointer;'  title='Inactive' >";
				$bar->namabarang=$bar->namabarang. " [Inactive]";
				$bgr=" bgcolor='red'";
		}
		else
		{				
			echo"<tr class=rowcontent style='cursor:pointer;' onclick=\"setBrg('".$bar->kodebarang."','".$bar->namabarang."','".$bar->satuan."')\" title='Click' >";
		}   
		echo" <td>".$no."</td>
				  <td>".$bar->kodebarang."</td>
				  <td>".$bar->namabarang."</td>
				  <td>".$bar->satuan."</td>
				  <td align=right>".number_format($saldoqty,2,',','.')."</td>
				 </tr>";
				}	 
				echo "</tbody>
				</table></div></fieldset>";
		  }	
		  else{
				echo $_SESSION['lang']['alertfail']. " : ".addslashes(mysql_error($conn));
		  }

		break;
		 case'formPersetujuan':

		$kd=substr($nopp,17,2);
		$unit=substr($nopp,15,4);
			/*if($kd!='HO'){
				$str="select distinct a.karyawanid,b.namakaryawan,b.lokasitugas from ".$dbname.".setup_approval a 
					  left join ".$dbname.".datakaryawan b on a.karyawanid=b.karyawanid where 
					  a.karyawanid!='".$_SESSION['standard']['userid']."' and a.applikasi='PR' and a.kodeunit='".$unit."'  order by b.namakaryawan asc";
			}
			else{
				$str="select karyawanid,namakaryawan,lokasitugas,bagian from ".$dbname.".`datakaryawan` 
					  where karyawanid!='".$_SESSION['standard']['userid']."' and (tanggalkeluar = '0000-00-00' or tanggalkeluar > '".date("Y-m-d")."') and tipekaryawan in ('0','7','8')
					  and lokasitugas!='' order by namakaryawan asc";
			} */
			
				$str="select distinct a.karyawanid,b.namakaryawan,b.lokasitugas from ".$dbname.".setup_approval a 
					  left join ".$dbname.".datakaryawan b on a.karyawanid=b.karyawanid where 
					  lokasitugas='".$_SESSION['empl']['lokasitugas']."' and
					  a.karyawanid!='".$_SESSION['standard']['userid']."' and a.applikasi='PP' and a.kodeunit='".$unit."'  order by b.namakaryawan asc";
			
			$qry=mysql_query($str) or die(mysql_error($conn));
			while($rkry=mysql_fetch_assoc($qry)){
				$optKry.="<option value='".$rkry['karyawanid']."'>".$rkry['namakaryawan']." [".$rkry['lokasitugas']."]</option>";
			}
		$tab.="<fieldset style=width:250px;>
		<legend>".$_SESSION['lang']['pengajuan']."</legend>";
		$tab.="<table cellspacing=1 border=0>
		<tr>
		<td>".$_SESSION['lang']['nopp']."</td>
		<td>:</td>
		<td><input type=\"text\" id=\"fnopp\" name=\"fnopp\" readonly=\"readonly\"  value='".$nopp."' /></td>
		</tr>
		<tr>
		<td>".$_SESSION['lang']['kepada']."</td>
		<td>:</td>
		<td>
		<select id=\"karywn_id\" name=\"karywn_id\">
		". $optKry."
		</select>
		</td>
		</tr>
		<input type=\"hidden\" id=\"cls_stat\" name=\"cls_stat\" value=0 />
		<tr>
		<td colspan=\"3\">
		<button class=mybutton onclick=reset_data_setuju()>".$_SESSION['lang']['cancel']."</button>
		<button class=mybutton onclick=save_persetujuan() >".$_SESSION['lang']['diajukan']."</button>
		</td>
		</tr>
		</table>
		</fieldset>";
		echo $tab;
		break;
		default:
break;	
}
?>