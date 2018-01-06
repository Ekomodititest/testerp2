<?php
session_start();
require_once('master_validation.php');
require_once('config/connection.php');
include_once('lib/nangkoelib.php');
require_once('lib/zLib.php');
$proses=$_POST['proses'];

$kd_bag=$_POST['kd_bag'];
$nocip=$_POST['nocip'];
$tgl_cip=tanggalsystem($_POST['tgl_cip']);
$keterangan=$_POST['keterangan'];
$createby=$_SESSION['standard']['userid'];
$noakun=$_POST['noakun'];
	switch($proses)
	{
		case'LoadData':
		$limit=10;
		$page=0;
		if(isset($_POST['page']))
		{
		$page=$_POST['page'];
		if($page<0)
		$page=0;
		}
		$offset=$page*$limit;

//if($_SESSION['empl']['tipelokasitugas']== $_SESSION['org']['kodeho']){
if($_SESSION['org']['pusat']){
	$str="select * from ".$dbname.".log_cipht order by `create_date` desc limit ".$offset.",".$limit."";
	$ql2="select count(*) as jmlhrow from ".$dbname.".log_cipht order by `create_date` desc";
} 
else {
	$str="select * from ".$dbname.".log_cipht 
	where substr(nocip,17,5) = '".$_SESSION['empl']['lokasitugas']."'
	order by `create_date` asc limit ".$offset.",".$limit."";
	$ql2="select count(*) as jmlhrow from ".$dbname.".log_cipht 
	where substr(nocip,17,5) = '".$_SESSION['empl']['lokasitugas']."'
	order by `create_date` desc";
}					

$query2=mysql_query($ql2) or die(mysql_error());
while($jsl=mysql_fetch_object($query2)){
$jlhbrs= $jsl->jmlhrow;
}
		
//echo $str;
		if($res=mysql_query($str)){
			while($bar=mysql_fetch_object($res)){
				$no+=1;
				//echo $minute_selesai; exit();
				$sqa="select namaorganisasi from ".$dbname.".organisasi where kodeorganisasi='".$bar->kodeorg."'";
				//echo $sqa;
					if($hsil=mysql_query($sqa))
					{
						while($barx=mysql_fetch_object($hsil))
						{
							$namaorganisasi=$barx->namaorganisasi;
						}	
					}
				$kdorg=substr($bar->nocip,16,4);					
				$cekcip = mysql_query("SELECT nocip FROM ".$dbname.".log_cipdt_for_jurnal WHERE nocip ='".$bar->nocip."'");
				$ttlcip = mysql_num_rows($cekcip);					
				echo"<div style=\"vertical-align:middle\"><tr class=rowcontent id='tr_".$no."' >
				<td align=center>".$no."</td>
				<td align=center>".$bar->kodeorg."</td>
				<td align=center>".$bar->nocip."</td>
				<td align=center>".$bar->noakun."</td>
				<td align=center>".$bar->keterangan."</td>
				<td align=center>".$bar->tanggal."</td>
				<td align=center>".$bar->create_date."</td>
				<td style=\"vertical-align:middle\">
					<img src=images/application/application_edit.png class=resicon  title='Edit' onclick=\"fillField('".$bar->nocip."','".$bar->isPosting."');\" style=\"vertical-align:middle;\">
					<img src=images/application/application_delete.png class=resicon  title='Delete' onclick=\"deldata('".$bar->nocip."','".$bar->isPosting."');\" style=\"vertical-align:middle;\">
					<img src=images/application/circle_more_detail.png class=resicon title='Detail CIP' onclick=\"showdetailcip('".$kdorg."','".$bar->nocip."','".$bar->keterangan."','".$bar->tanggal."','".$bar->noakun."','".$bar->isPosting."');\" style=\"vertical-align:middle;\">
				";	
				if($ttlcip > 0) {
					echo "<img src=images/application/upload4.png class=resicon title='Posting dan pengangkatan aset' onclick=\"showdetail4jurnal('".$kdorg."','".$bar->nocip."','".$bar->keterangan."','".$bar->tanggal."','".$bar->noakun."');\" style=\"vertical-align:middle;cursor:pointer;\">";
				} 					
				echo "</td>
				</tr></div>";
			}	 	 
			echo"
			<tr><td colspan=8 align=center>
			".(($page*$limit)+1)." to ".(($page+1)*$limit)." Of ".  $jlhbrs."<br />
			<button class=mybutton onclick=cariBast(".($page-1).");>".$_SESSION['lang']['pref']."</button>
			<button class=mybutton onclick=cariBast(".($page+1).");>".$_SESSION['lang']['lanjut']."</button>
			</td>
			</tr>";     	
		}	
		else
		{
		echo " Gagal,".(mysql_error($conn));
		}	
		break;
		case'insert':
		if(($kd_bag=='')||($nocip=='')||($tgl_cip==''))
		{
			echo"warning: Lengkapi Form Inputan";
			exit();
		}
			$sorg="select alokasi from ".$dbname.".organisasi where kodeorganisasi='".$kd_bag."'";
            $qorg=mysql_query($sorg) or die(mysql_error());
            $rorg=mysql_fetch_assoc($qorg);
			$kd_org=$rorg['alokasi'];
			$sIns="insert into ".$dbname.".log_cipht (kodeorg,nocip,tanggal,keterangan,create_by,noakun) values
			      ('".$kd_org."', '".$nocip."', '".$tgl_cip."', '".$keterangan."','".$createby."','".$noakun."')";
			//exit("error :".$sIns);	  
			if(mysql_query($sIns))
			echo"";
			else
			echo "DB Error : ".mysql_error($conn);
		
		break;
		case'showData':
		$sql="select* from ".$dbname.".log_cipht where nocip='".$nocip."'";
		$kodex=substr($nocip,16,4);
		$sq="select kodeorganisasi,namaorganisasi from ".$dbname.".organisasi where kodeorganisasi='".$kodex."'";
		$queryx=mysql_query($sq) or die(mysql_error());
		$resx=mysql_fetch_assoc($queryx);
		#########################################################################################################
		#echo"warning".$sql;//id, lokasi, ip, username, password, port
		$query=mysql_query($sql) or die(mysql_error());
		$res=mysql_fetch_assoc($query);
		##########################################################################################################
		//$sqq="select noakun,namaakun from ".$dbname.".keu_5akun where noakun='".$res['noakun']."'";
		if($_SESSION['language']=='EN'){
			$dd='namatipe1';
		}else{
			$dd='namatipe';
		}
		$sqq="select akunak as noakun,".$dd." as namaakun from ".$dbname.".sdm_5tipeasset where akunak='".$res['noakun']."'order by noakun";
		$queryq=mysql_query($sqq) or die(mysql_error());
		$resq=mysql_fetch_assoc($queryq);
		##########################################################################################################
		echo $res['kodeorg']."###".$res['nocip']."###".$res['keterangan']."###".tanggalnormal($res['tanggal'])."###".$resx['namaorganisasi']."###".$resx['kodeorganisasi']."###".$res['noakun']."###".$resq['namaakun'];
		break;
		case'update':
		if(($kd_bag=='')||($nocip=='')||($tgl_cip==''))
		{
			echo"warning: Lengkapi Form Inputan";
			exit();
		}
		
			$sUpd="update ".$dbname.".log_cipht set keterangan='".$keterangan."' where nocip='".$nocip."'";
		//	echo "warning:".$sUpd;exit();
			if(mysql_query($sUpd))
			echo"";
			else
			echo "DB Error : ".mysql_error($conn);
		
		break;
		case'delData':
		$sDel="delete from ".$dbname.".log_cipht where nocip='".$nocip."'";
		if(mysql_query($sDel))
		echo"";
		else
		echo "DB Error : ".mysql_error($conn);
		break;
		case'showCIPdet':
			$kdorg=trim($_POST['kdorg']);
			$nocip=$_POST['nocip'];
			$noakun=$_POST['noakun'];
			$keterangan=$_POST['keterangan'];
			$tanggalbuat=tanggalnormal($_POST['tanggalbuat']);
			$sqz="select kodeorganisasi,namaorganisasi from ".$dbname.".organisasi where kodeorganisasi='".$kdorg."'";
			$queryt=mysql_query($sqz) or die(mysql_error());
			$resz=mysql_fetch_assoc($queryt);
			####
			$sqx="select noakun,namaakun from ".$dbname.".keu_5akun where noakun='".$noakun."'";
			$queryc=mysql_query($sqx) or die(mysql_error());
			$rest=mysql_fetch_assoc($queryc);
			####
			echo "<fieldset><legend>Header CIP</legend><table id='CIPHeaderTable'>
				<tr>
					<td align=left>Nama Organisasi</td>
					<td align=left>:</td>
					<td align=left><input type=text value='".$resz['namaorganisasi']."' style=width:170px id=namaorganisasi class=\"myinputtext\" disabled=disabled></td>
			</tr>
			<tr>
			<td align=left>Tipe Aset</td>
			<td align=left>:</td>
			<td align=left><input type=text value='".$rest['namaakun']."' style=width:170px id=noakunx class=\"myinputtext\" disabled=disabled>
			<input type=hidden id=noakuny value='".$noakun."'></td>
			</tr>
			<tr>
			<td align=left>No CIP</td>
			<td align=left>:</td>
			<td align=left><input type=text value='".$nocip."' style=width:170px id=nocipx class=\"myinputtext\" disabled=disabled></td>
			</tr>
			<tr>
			<td align=left>Keterangan</td>
			<td align=left>:</td>
			<td align=left><input type=text value='".$keterangan."' style=width:170px id=keterangan class=\"myinputtext\" disabled=disabled></td>
			</tr>
			<tr>
			<td align=left>Tanggal Dibuat</td>
			<td align=left>:</td>
			<td align=left><input type=text value='".$tanggalbuat."' style=width:170px id=tglbuat class=\"myinputtext\" disabled=disabled></td>
			<td align=left>No. Asset</td>
			<td align=left>:</td>
			<td align=left><input type=text style=\"width:170px\" id=noaset name=\"noaset\" class=\"myinputtext\" disabled /></td>
			<td><button name=asset id=asset onclick=\"showdetailcip('".$kdorg."','".$nocip."','".$keterangan."','".$tanggalbuat."','".$noakun."');\">Refresh Data</button></td>
			</tr>
			</table></fieldset>
			<fieldset><legend>Detail CIP</legend><table id='CIPDetailTable'>
			<thead>
			<tr>
			<td align=center>No</td>
			<td align=center>Action</td>
			<td align=center>Akun Biaya</td>
			<td align=center width=10px>Kode Barang</td>
			<td align=center>Nama Barang</td>
			<td align=center>No PR</td>
			<td align=center>No PO</td>
			<td align=center>No GRN</td>
			<td align=center>Jumlah</td>
			<td align=center>Harga Satuan</td>
			<td align=center>SubTotal</td>
			</tr>
			</thead>
			<tbody id='detailBody'>";
			$i=0;	
			#======= Display Data Detail CIP =======
			//$sql2 = "select * from ".$dbname.".log_cipdt where `nocip`='".$_POST['nocip']."'";
			//$sql2 = "select * from ".$dbname.".log_view_cipvspovslpb_vw where `nocip`='".$_POST['nocip']."'";
			$sql2 = "select ".$dbname.".log_cipdt.*,b.nopo,b.hargasatuan from ".$dbname.".log_cipdt
			         left join (select nopp,nopo,hargasatuan,kodebarang from ".$dbname.".log_podt group by nopp) b 
					 on log_cipdt.nopp = b.nopp AND log_cipdt.kodebarang=b.kodebarang 
					 where `nocip`='".$_POST['nocip']."' AND isgrn=1";
			//echo $sql2;
			$quez=mysql_query($sql2) or die(mysql_error());
			while($res2=mysql_fetch_object($quez)){
				$no+=1;
				$sbrg="select * from ".$dbname.".log_5masterbarang where kodebarang='".$res2->kodebarang."'";
                $qbrg=mysql_query($sbrg) or die(mysql_error());
                $rbrg=mysql_fetch_object($qbrg);
				####query cari harga satuan di dalam tabel "log_podt"
				$sPO="select hargasatuan from ".$dbname.".log_podt where kodebarang='".$res2->kodebarang."'";
                $qPO=mysql_query($sPO) or die(mysql_error());
                $rPO=mysql_fetch_object($qPO);
				####
				####get subtotal data
				$jumlah=$res2->jumlah;
				$hrgsat=$rPO->hargasatuan;
				$subtotal=$hrgsat*$jumlah;
				####
				####query cari no grn di dalam tabel "log_lpbht"
				$sGRN="select notransaksi from ".$dbname.".log_transaksiht where nopo='".$res2->nopo."'";
                $qGRN=mysql_query($sGRN) or die(mysql_error());
                $rGRN=mysql_fetch_object($qGRN);
				####
				####
				if($_SESSION['language']=='EN'){
					$dd='namaakun1';
				}else{
					$dd='namaakun';
				}
				$str="select noakun,".$dd." as namakegiatan from ".$dbname.".keu_5akun where tipeakun='Biaya' and detail=1 order by noakun";
				$res=mysql_query($str);
				while($bar=mysql_fetch_object($res))
				{
					//$optakun.="<option value='".$bar->noakun."'>".$bar->noakun." ".$bar->namakegiatan."</option>";
					$optakun.="<option value='".$bar->noakun."'>".$bar->namakegiatan." ".$bar->noakun."</option>";
				}
				####
				$strw="select noakun,".$dd." as namakegiatan from ".$dbname.".keu_5akun where tipeakun='Aktiva' and detail=1 order by noakun";
				$resw=mysql_query($strw);
				while($barw=mysql_fetch_object($resw))
				{
					//$optakun.="<option value='".$bar->noakun."'>".$bar->noakun." ".$bar->namakegiatan."</option>";
					$optakun2.="<option value='".$barw->noakun."'>".$barw->namakegiatan." ".$barw->noakun."</option>";
				}
				####
				echo"
                     <tr class=rowcontent ".$show." id=tr_".$no." align=center>
                     <td align=center >".$no."</td>
					 <td align=center><input type=checkbox id=plh_cip_".$no." name=plh_cip_".$no."/ onclick=\"tutup(".$no.")\" checked title=\"Check untuk Asset.Uncheck untuk Biaya.\"></td>
					 <td align=center><select id=noakun_".$no." style=\"width: 150px;\" disabled><option value=\"\" selected=\"selected\"></option>".$optakun."</select></td>                    
					 <td align=center ><input type=text style=\"width: 60px;text-align:center\" id=kdbrg_".$no." value='".$res2->kodebarang."' class=\"myinputtext\" disabled></td>
                     <td align=left style=\"width:200px\" id=nmbrg_".$no.">".$rbrg->namabarang."</td>
					 <td align=center ><input type=text style=\"width: 110px;\" id=nopp_".$no." value='".$res2->nopp."' class=\"myinputtext\" disabled width=5px></td>
					 <td align=center ><input type=text style=\"width: 125px;\" id=nopo_".$no." value='".$res2->nopo."' class=\"myinputtext\" disabled width=5px></td>
					 <td align=center ><input type=text style=\"width: 125px;\" id=nogrn_".$no." value='".$rGRN->notransaksi."' class=\"myinputtext\" disabled width=5px></td>
					 <td align=center ><input type=text style=\"width: 30px;text-align:center\" id=jumlah_".$no." value='".$res2->jumlah."' class=\"myinputtext\" disabled></td>
                     <td align=right ><input type=text style=\"width: 80px;text-align:right\" id=hrgsatuan_".$no." value='".number_format($rPO->hargasatuan)."' class=\"myinputtext\" disabled></td>
                     <td align=right ><input type=text style=\"width: 80px;text-align:right\" id=subtotal_".$no." value='".number_format($subtotal)."' class=\"myinputtext\" disabled></td>
                     </tr>  
					 </tbody></fieldset>";					 
			}
			
					echo "<tr><td colspan=11 align=center >
					 <button name=CIPDtl id=CIPDtl onclick=\"simpanCIPDtl();\">Simpan</button>
					 <button name=batal id=batal onclick=\"batalDtl();\">Batal</button></td></tr>
			         </tbody></fieldset>";
			//echo $table;
		break;
		case'showData4Jurnal':
			$kdorg=trim($_POST['kdorg']); //log_cipht
			$nocip=$_POST['nocip'];
			$noakun=$_POST['noakun'];
			$sqz="select kodeorganisasi,namaorganisasi from ".$dbname.".organisasi where kodeorganisasi='".$kdorg."'";
			$queryt=mysql_query($sqz) or die(mysql_error());
			$resz=mysql_fetch_assoc($queryt);
			####
			$sqx="select noakun,namaakun from ".$dbname.".keu_5akun where noakun='".$noakun."'";
			$queryc=mysql_query($sqx) or die(mysql_error());
			$rest=mysql_fetch_assoc($queryc);
			####
			echo "<fieldset><legend>Data Untuk Posting dan Pengangkatan Aset</legend><table id='CIPPost2Jurnal'>
				<!--tr>
				<td align=left>No. Asset</td>
				<td align=left>:</td>
				<td align=left><input type=text style=\"width:170px\" id=noaset name=\"noaset\" class=\"myinputtext\" disabled /></td>
				</tr-->
				</table><table id='CIPJurnalTable'>
				<thead>
				<tr>
				<td align=center>No</td>
				<td align=center>No.Akun Biaya</td>
				<td align=center width=10px>Kode Barang</td>
				<td align=center>Nama Barang</td>
				<td align=center>No PR</td>
				<td align=center>No PO</td>
				<td align=center>No GRN</td>
				<td align=center>Jumlah</td>
				<td align=center>Harga Satuan</td>
				<td align=center>SubTotal</td>
				</tr>
				</thead>
				<tbody id='detailBody4Jurnal'>";
				$i=0;	
				#======= Display Data Detail CIP =======
				$sql3 = "select * from ".$dbname.".log_cipdt_for_jurnal where `nocip`='".$_POST['nocip']."'";
				$quez=mysql_query($sql3) or die(mysql_error());
				while($res2=mysql_fetch_object($quez))
				{
					$no+=1;
					$sbrg="select * from ".$dbname.".log_5masterbarang where kodebarang='".$res2->kodebarang."'";
					$qbrg=mysql_query($sbrg) or die(mysql_error());
					$rbrg=mysql_fetch_object($qbrg);
					####query cari harga satuan di dalam tabel "log_podt"
					###query dibawah kurang nopo sebagai pencari / where (10022016)
					$sPO="select hargasatuan from ".$dbname.".log_podt where kodebarang='".$res2->kodebarang."' and nopo='".$res2->nopo."'";
					$qPO=mysql_query($sPO) or die(mysql_error());
					$rPO=mysql_fetch_object($qPO);
					####
					####
					if($res2->noakunbiaya==''){
						$namaakun='';
					}
					else{
						$str1="select namaakun from ".$dbname.".keu_5akun where `noakun`='".$res2->noakunbiaya."' order by noakun";
						$res1=mysql_query($str1);
						while($bar1=mysql_fetch_object($res1)){
							$namaakun=$bar1->namaakun;							
						}
					}
					$x=$namaakun.' - '.$res2->noakunbiaya;
					####
					echo"
						 <tr class=rowcontent ".$show." id=tr_".$no." align=center>
						 <td align=center >".$no."</td>
						 <!--td align=center><select id=noakun_".$no." style=\"width: 150px;\" disabled><option value=\"\" selected=\"selected\"></option>".$optakun."</select></td-->  
						 <td align=center >
							<input type=text style=\"width: 160px;text-align:center\" id=nmakun_".$no." value='".$x."' class=\"myinputtext\" disabled>
							<input type=hidden style=\"width: 160px;text-align:center\" id=noakun_".$no." value='".$res2->noakunbiaya."' class=\"myinputtext\" disabled>
						 </td>		
						 <td align=center ><input type=text style=\"width: 60px;text-align:center\" id=kdbrg_".$no." value='".$res2->kodebarang."' class=\"myinputtext\" disabled></td>
						 <td align=left style=\"width:200px\" id=nmbrg_".$no.">".$rbrg->namabarang."</td>
						 <td align=center ><input type=text style=\"width: 110px;\" id=nopp_".$no." value='".$res2->nopp."' class=\"myinputtext\" disabled width=5px></td>
						 <td align=center ><input type=text style=\"width: 125px;\" id=nopo_".$no." value='".$res2->nopo."' class=\"myinputtext\" disabled width=5px></td>
						 <td align=center ><input type=text style=\"width: 125px;\" id=nogrn_".$no." value='".$res2->nogrn."' class=\"myinputtext\" disabled width=5px></td>
						 <td align=center ><input type=text style=\"width: 30px;text-align:center\" id=jumlah_".$no." value='".$res2->jumlah."' class=\"myinputtext\" disabled></td>
						 <td align=right ><input type=text style=\"width: 80px;text-align:right\" id=hrgsatuan_".$no." value='".number_format($rPO->hargasatuan)."' class=\"myinputtext\" disabled></td>
						 <td align=right ><input type=text style=\"width: 80px;text-align:right\" id=subtotal_".$no." value='".number_format($res2->subtotal)."' class=\"myinputtext\" disabled></td>
						 </tr>  
						 </tbody></fieldset>";					 
				}
				
				$statpost = 0;
				$cekposting = mysql_query("SELECT isPosting FROM ".$dbname.".log_cipht WHERE nocip='".$nocip."'");
				while($baris=mysql_fetch_object($cekposting)){
					$statpost=$baris->isPosting;							
				}								
				
				
				
						echo "<tr><td colspan=11 align=center >";
						if($statpost == 1) {
							echo "<button disabled=disabled title='Sudah diposting'>Posting</button>";
						} 
						else {
							echo "<button name=CIPDtl id=CIPDtl onclick=\"posting2Jurnal('".$nocip."');\">Posting</button>";
						}
						 echo "<button name=batal id=batal onclick=\"batalDtl();\">Batal</button></td></tr>
						 </tbody>";
			
		break;
		case'post2JurnalBiaya':
			$createby = $_SESSION['standard']['userid'];
			$nocip    = $_POST['nocip'];
			$noaset   = $_POST['noaset'];
			###ambil baris data yang merupakan biaya dimana is Asset = '0'
			$queryisCo ="SELECT * FROM ".$dbname.".log_cipdt_for_jurnal WHERE nocip='".$nocip."' AND isAsset='0'";
			$qIsCo=mysql_query($queryisCo) or die(mysql_error());
			while($rCo=mysql_fetch_assoc($qIsCo)){
				$queryA = selectQuery($dbname,'log_cipht',"*","nocip='".$nocip."'");
				$dataA  = fetchData($queryA);
				#===Get Journal Counter
					$queryJ = selectQuery($dbname,'keu_5kelompokjurnal','nokounter', "kodeorg='".$_SESSION['org']['kodeorganisasi']."' and kodekelompok='COCIP'");
					$tmpKonter = fetchData($queryJ);
					$konter = addZero($tmpKonter[0]['nokounter']+1,3);
					//exit("error: ".$queryJ);
				#===Prep No Jurnal
					//$nojurnal = str_replace('-','',$dataH[0]['tanggal'])."/".$dataH[0]['kodeorg']."/"."INVM1"."/".$konter;
					$nojurnal = str_replace('-','',$dataA[0]['tanggal'])."/".$_SESSION['empl']['lokasitugas']."/"."COCIP"."/".$konter;
					//exit("error: ".$nojurnal);				    
					//exit("error: ".print_r($dataA));
				#=== Cek if posted ===
					$error0 = "";
					if($dataA[0]['isPosting']=='1') {
						$error0 .= $_SESSION['lang']['errisposted'];
					}
					if($error0!='') {
						echo "Data Error :\n".$error0;
						exit;
					}
				#====cek periode
				# disable dulu untuk testing nanti balikin lagi 
					/* $tgl = str_replace("-","",$dataA[0]['tanggal']);
					if($_SESSION['org']['period']['start']>$tgl){
						exit('Error:Date beyond active period');
					} */
					
				/* Kredit */	
				$sIns="insert into ".$dbname.".keu_jurnalht(nojurnal,kodejurnal,tanggal,tanggalentry,posting,totaldebet
					       ,totalkredit,amountkoreksi,noreferensi,autojurnal,matauang,kurs,revisi) 
						   values('".$nojurnal."','COCIP','".$dataA[0]['tanggal']."','".date('Y-m-d')."','0',".$rCo['subtotal'].",
						   ".$rCo['subtotal']*(-1).",'0','".$rCo['nopo']."','0','IDR','1','0')";
						   
				if(!mysql_query($sIns)){
					echo "Gagal,".(mysql_error($conn));exit();
				}
				else{
					# Kunco 13 Oktober 2016 #
					$qnoakun = "SELECT noakun FROM ".$dbname.".log_cipht WHERE nocip='".$nocip."' AND isPosting='0'";
					#########################
					//$qnoakun = selectQuery($dbname,'keu_5parametertrx',"*","kodeparameter='4'");
					$dataakun = fetchData($qnoakun);
					$noak = $dataakun[0]['noakun'];
					/* Debit */
					$sInsq="insert into ".$dbname.".keu_jurnaldt(nojurnal,tanggal,nourut,noakun,keterangan,jumlah
				       ,matauang,kurs,kodeorg,kodekegiatan,kodeasset,kodebarang,nik,kodecustomer,kodesupplier,
					   noreferensi,noaruskas,kodevhc,nodok,kodeblok,revisi) 
					   values('".$nojurnal."','".$dataA[0]['tanggal']."',1,'".$rCo['noakunbiaya']."','',".$rCo['subtotal'].",'IDR',
					   '1','".$_SESSION['empl']['lokasitugas']."','','','','','','','".$rCo['nopo']."'
					   ,'','','','','0')";
					if(!mysql_query($sInsq)){
						echo "Gagal,".(mysql_error($conn));exit();
					}
					else{
					/* Kredit */							
					$sInsq2="insert into ".$dbname.".keu_jurnaldt(nojurnal,tanggal,nourut,noakun,keterangan,jumlah
				       ,matauang,kurs,kodeorg,kodekegiatan,kodeasset,kodebarang,nik,kodecustomer,kodesupplier,
					   noreferensi,noaruskas,kodevhc,nodok,kodeblok,revisi) 
					   values('".$nojurnal."','".$dataA[0]['tanggal']."',2,'".$noak."','',".$rCo['subtotal']*(-1).",'IDR',
					   '1','".$_SESSION['empl']['lokasitugas']."','','','','','','','".$rCo['nopo']."'
					   ,'','','','','0')";
					   if(!mysql_query($sInsq2)){
							echo "Gagal,".(mysql_error($conn));exit();
						}
					}
					// Posting Success
					#=== Add Counter Jurnal ===
					$queryJ = updateQuery($dbname,'keu_5kelompokjurnal',array('nokounter'=>$tmpKonter[0]['nokounter']+1),
						"kodeorg='".$_SESSION['org']['kodeorganisasi']."' and kodekelompok='COCIP'");
					$errCounter = "";
					if(!mysql_query($queryJ)) {
						$errCounter.= "Update Counter Parameter Jurnal Error :".mysql_error()."\n";
					}
					if($errCounter!="") {
						$queryJRB = updateQuery($dbname,'keu_5kelompokjurnal',array('nokounter'=>$tmpKonter[0]['nokounter']),
							"kodeorg='".$_SESSION['org']['kodeorganisasi']."' and kodekelompok='COCIP'");
						$errCounter = "";
						if(!mysql_query($queryJRB)) {
							$errorJRB .= "Rollback Parameter Jurnal Error :".mysql_error()."\n";
						}
						echo "DB Error :\n".$errorJRB;
						exit;
					}		
				}
			}
			//break;
			###################################################untuk posting ke jurnal barang yang dianggap asset (16/12/2015)
			//case'post2JurnalFa':
			$nocip=$_POST['nocip'];
			##==ambil data yg merupakan FA lalu di group by berdasarkan nocip
			$queryisFa ="select * from ".$dbname.".log_cipdt_for_jurnal where nocip='".$nocip."' AND isAsset='1' group by nocip";
			$qIsFa=mysql_query($queryisFa) or die(mysql_error());
			//$num_rows = mysql_num_rows($qIsFa);
			//exit("error: ".$queryisFa);
			while($rFa=mysql_fetch_object($qIsFa)){
				##==hitung subtotal dari semua baris yang merupakan asset (FA-Fixed Asset)
				$qTotFa = "select sum(subtotal) as subtot from ".$dbname.".log_cipdt_for_jurnal where nocip='".$nocip."' AND isAsset='1'";
				//exit("error: ".$qTotFa);
				$TotFa=mysql_query($qTotFa) or die(mysql_error());
				if($rFa=mysql_fetch_assoc($TotFa)){
					$subtot=$rFa['subtot'];
				}
				$queryA = selectQuery($dbname,'log_cipht',"*","nocip='".$nocip."'");
				$dataA = fetchData($queryA);
				#===Get Journal Counter
					$queryJ = selectQuery($dbname,'keu_5kelompokjurnal','nokounter',"kodeorg='".$_SESSION['org']['kodeorganisasi']."' and kodekelompok='FACIP'");
					$tmpKonter = fetchData($queryJ);
					$konter = addZero($tmpKonter[0]['nokounter']+1,3);
					//exit("error: ".$queryJ);
				#===Prep No Jurnal
					//$nojurnal = str_replace('-','',$dataH[0]['tanggal'])."/".$dataH[0]['kodeorg']."/"."INVM1"."/".$konter;
					$nojurnal = str_replace('-','',$dataA[0]['tanggal'])."/".$_SESSION['empl']['lokasitugas']."/"."FACIP"."/".$konter;
					//exit("error: ".$nojurnal);
					//exit("error: ".print_r($dataA));
				#=== Cek if posted ===
					$error0 = "";
					if($dataA[0]['isPosting']=='1') {
						$error0 .= $_SESSION['lang']['errisposted'];
					}
					if($error0!='') {
						echo "Data Error :\n".$error0;
						exit;
					}
				#====cek periode
				# disable dulu untuk testing nanti balikin lagi 
					/* $tgl = str_replace("-","",$dataA[0]['tanggal']);
					if($_SESSION['org']['period']['start']>$tgl){
						exit('Error:Date beyond active period');
					}*/
				##==insert ke tabel jurnal header
					$sInsFa="insert into ".$dbname.".keu_jurnalht(nojurnal,kodejurnal,tanggal,tanggalentry,posting,totaldebet
					       ,totalkredit,amountkoreksi,noreferensi,autojurnal,matauang,kurs,revisi) 
						   values('".$nojurnal."','FACIP','".$dataA[0]['tanggal']."','".date('Ymd')."','0',".$subtot.",
						   ".$subtot*(-1).",'0','".$nopo."','0','IDR','1','0')";
					if(!mysql_query($sInsFa)){
						echo "Gagal,".(mysql_error($conn));exit();
					}
					 else{
						##==ambil data dari kolom "noakun" untuk isi debit(+) dari tabel "log_cipht"
						$queryB = selectQuery($dbname,'log_cipht',"*","nocip='".$nocip."' and isPosting='0'");
						$dataB = fetchData($queryB);
						$akuncip = $dataB[0]['noakun'];
						##==ambil data dari kolom "noakun" untuk isi kredit (-) dari tabel "keu_5parametertrx"
						//$qnoakun = selectQuery($dbname,'keu_5parametertrx',"*","kodeparameter='4'");
						# Kunco 13 Oktober 2016 #
						$qnoakun = "SELECT a.akunasset FROM ".$dbname.".sdm_5tipeasset a INNER JOIN ".$dbname.".log_cipht b ON a.akunak = b.noakun WHERE nocip='".$nocip."' AND isPosting='0'";
						#########################
						$dataakun = fetchData($qnoakun);
						$noak = $dataakun[0]['akunasset'];
						$sInsK="insert into ".$dbname.".keu_jurnaldt(nojurnal,tanggal,nourut,noakun,keterangan,jumlah
							   ,matauang,kurs,kodeorg,kodekegiatan,kodeasset,kodebarang,nik,kodecustomer,kodesupplier,
							   noreferensi,noaruskas,kodevhc,nodok,kodeblok,revisi) 
							   values('".$nojurnal."','".$dataA[0]['tanggal']."',1,'".$noak."','',".$subtot.",'IDR',
							   '1','".$_SESSION['empl']['lokasitugas']."','','','','','','','".$rFa->nopo."'
							   ,'','','','','0')";
						if(!mysql_query($sInsK)){
							echo "Gagal,".(mysql_error($conn));exit();
						}
						else{
							$sInsJ="insert into ".$dbname.".keu_jurnaldt(nojurnal,tanggal,nourut,noakun,keterangan,jumlah
							   ,matauang,kurs,kodeorg,kodekegiatan,kodeasset,kodebarang,nik,kodecustomer,kodesupplier,
							   noreferensi,noaruskas,kodevhc,nodok,kodeblok,revisi) 
							   values('".$nojurnal."','".$dataA[0]['tanggal']."',2,'".$akuncip."','',".$subtot*(-1).",'IDR',
							   '1','".$_SESSION['empl']['lokasitugas']."','','','','','','','".$rFa->nopo."'
							   ,'','','','','0')";
							if(!mysql_query($sInsJ)){
								echo "Gagal,".(mysql_error($conn));exit();
							}
							##==insert ke table "sdm_daftarasset" untuk modul "Asset List"
							else{
								$kdorg=$_SESSION['empl']['lokasitugas'];$status='1';$penambah=0;$pengurang=0;
								$queryP = selectQuery($dbname,'sdm_5tipeasset',"*","akunak='".$dataA[0]['noakun']."'");
								$dataP = fetchData($queryP);$hrgperoleh=$subtot;
								$tipeasset=$dataP[0]['kodetipe'];$awalnyusut=substr($dataA[0]['tanggal'],0,7);
								$nmasset=$dataA[0]['keterangan'];
								$thnperoleh=substr($dataA[0]['tanggal'],0,4);
								##============================================================================================define kodeasset 
								$sPt="select distinct induk from ".$dbname.".organisasi where kodeorganisasi='".$_SESSION['empl']['lokasitugas']."'";
								$qPt=mysql_query($sPt) or die(mysql_error($conn));
								$rPt=mysql_fetch_assoc($qPt);
								//$kpl=$rPt['induk']."-".$_POST['kdAset'];
								$kpl=$rPt['induk']."-".$tipeasset;
								//$scek="select distinct kodeasset from ".$dbname.".sdm_daftarasset 
								//  where tipeasset='".$_POST['kdAset']."' and kodeorg='".$_SESSION['empl']['lokasitugas']."' order by kodeasset desc limit 0,1";
								$scek="select distinct kodeasset from ".$dbname.".sdm_daftarasset 
									  where kodeasset like '".$kpl."%' order by kodeasset desc limit 0,1";
								//exit("Error:".$scek);
								$urut=0;
								$qcek=mysql_query($scek) or die(mysql_error($conn));
								$rcek=mysql_fetch_assoc($qcek);
								if($rcek['kodeasset']!=''){
									if(strlen($_POST['kdAset'])==3){
										$urut=substr($rcek['kodeasset'],-7);
									}
									else{
										$urut=substr($rcek['kodeasset'],-8);
									}
								}
							   // exit("Error:".);
								$rer=intval($urut);
								$kdcrt=$rer+1;
								$kdcrt=addZero($kdcrt, 7);
								if(strlen($_POST['kdAset'])<3){
									$kdcrt=addZero($kdcrt, 8);    
								}
								$kdasst=$kpl.$kdcrt;
								//echo $kdasst;		  
								##==============================================================================================	  
								$InsAsX="insert into ".$dbname.".sdm_daftarasset (
									   tipeasset,kodeorg,kodebarang,namasset,tahunperolehan,status,hargaperolehan,
									   jlhblnpenyusutan,awalpenyusutan,keterangan,kodeasset,user,bulanan,leasing,penambah,
									   pengurang,lokasi)values('".$tipeasset."','".$kdorg."','','".$nmasset."',
									   ".$thnperoleh.",".$status.",".$hrgperoleh.",0,'".$awalnyusut."',
			                           '".$dataA[0]['nocip']."','".$kdasst."',".$_SESSION['standard']['userid'].",0,
                                       0,".$penambah.",".$pengurang.",'".$kdorg."')";
								//exit("Error:".$InsAsX);	   
								if(!mysql_query($InsAsX)){
									echo "Gagal,".(mysql_error($conn));exit();
								}	   
							}		
						} 
					} 			
				// Posting Success
						#=== Add Counter Jurnal ===
						$queryJ = updateQuery($dbname,'keu_5kelompokjurnal',array('nokounter'=>$tmpKonter[0]['nokounter']+1),
							"kodeorg='".$_SESSION['org']['kodeorganisasi']."' and kodekelompok='FACIP'");
						$errCounter = "";
						if(!mysql_query($queryJ)) {
							$errCounter.= "Update Counter Parameter Jurnal Error :".mysql_error()."\n";
						}
						if($errCounter!="") {
							$queryJRB = updateQuery($dbname,'keu_5kelompokjurnal',array('nokounter'=>$tmpKonter[0]['nokounter']),
								"kodeorg='".$_SESSION['org']['kodeorganisasi']."' and kodekelompok='FACIP'");
							$errCounter = "";
							if(!mysql_query($queryJRB)) {
								$errorJRB .= "Rollback Parameter Jurnal Error :".mysql_error()."\n";
							}
							echo "DB Error :\n".$errorJRB;
							exit;
						}
				//#=== Switch Jurnal to 1 ===
				# Cek if already posted
				   $str="update ".$dbname.".log_cipht set isPosting='1', postingby=".$_SESSION['standard']['userid']." 
					 where nocip='".$nocip."'";
					mysql_query($str);
					if(mysql_affected_rows($conn)==0){
						echo "Error: None Updated".$str;
					}		
			}
		break;
		default:
		break;
	}
