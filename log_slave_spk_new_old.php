<?php
// ads asdfasda sdf
require_once('master_validation.php');
require_once('config/connection.php');

$method  = $_POST['method'];
$tipe="";			
if(isset($_POST['tipe'])){
$tipe= trim($_POST['tipe']);
}
$nospk="";			
if(isset($_POST['nospk'])){
$nospk= strtoupper($_POST['nospk']);
}
$nmkerja="";			
if(isset($_POST['nmkerja'])){
$nmkerja= trim($_POST['nmkerja']);
}
$act="";			
if(isset($_POST['act'])){
$act= trim($_POST['act']);
}
$cip="";			
if(isset($_POST['cip'])){
$cip= strtoupper($_POST['cip']);
}
$pihak1="";			
if(isset($_POST['pihak1'])){
$pihak1= trim($_POST['pihak1']);
}
$pihak2="";			
if(isset($_POST['pihak2'])){
$pihak2= trim($_POST['pihak2']);
}
$noreff="";			
if(isset($_POST['noreff'])){
$noreff= strtoupper($_POST['noreff']);
}
$mu="";			
if(isset($_POST['mu'])){
$mu= strtoupper($_POST['mu']);
}
$nilai   	   = 0;
if(isset($_POST['nilai'])){			
	$nilai   	   = trim($_POST['nilai']);
}
$waktu   	   = "";
if(isset($_POST['waktu'])){			
	$waktu   	   = trim($_POST['waktu']);
}
$bayar   	   = 0;
if(isset($_POST['bayar'])){			
	$bayar   	   = trim($_POST['bayar']);
}
$garansi   	   = "";
if(isset($_POST['garansi'])){			
	$garansi   	   = trim($_POST['garansi']);
}
$lain   	   = "";
if(isset($_POST['lain'])){			
	$lain   	   = trim($_POST['lain']);
}

$penalti   	   = 0;
if(isset($_POST['penalti'])){			
	$penalti   	   = trim($_POST['penalti']);
}

$approval   	   = "";
if(isset($_POST['approval'])){			
	$approval   	   = trim($_POST['approval']);
}

$ppnpersen   	   = 0;
if(isset($_POST['ppnpersen'])){			
	$ppnpersen   	   = trim($_POST['ppnpersen']);
}

$nilaippn   	   = 0;
if(isset($_POST['nilaippn'])){			
	$nilaippn   	   = trim($_POST['nilaippn']);
}

$pphpersen   	   = 0;
if(isset($_POST['pphpersen'])){			
	$pphpersen   	   = trim($_POST['pphpersen']);
}

$nilaipph   	   = 0;
if(isset($_POST['nilaipph'])){			
	$nilaipph   	   = trim($_POST['nilaipph']);
}

$muspk   	   = "";
if(isset($_POST['muspk'])){			
	$muspk   	   = trim($_POST['muspk']);
}

$nilaispk   	   = 0;
if(isset($_POST['nilaispk'])){			
	$nilaispk   	   = trim($_POST['nilaispk']);
}

$id   	   = 0;
if(isset($_POST['id'])){			
	$id   	   = trim($_POST['id']);
}

$nilaidp   	   = 0;
if(isset($_POST['nilaidp'])){			
	$nilaidp   	   = trim($_POST['nilaidp']);
}

$dppersen   	   = 0;
if(isset($_POST['dppersen'])){			
	$dppersen   	   = trim($_POST['dppersen']);
}


$persenppn = explode("-", $ppnpersen);
$persenpph = explode("-", $pphpersen);
$exppn ="0-0";
$expph ="0-0";


if(isset($_POST['ppn'])){			
	$exppn = explode('-', trim($_POST['ppn']));
}

if(isset($_POST['pph'])){			
	$expph = explode('-', trim($_POST['pph']));
}
$nilaispkidr=0;			
if(isset($_POST['nilaispkkonversi'])){
$nilaispkidr=$_POST['nilaispkkonversi'];
}
$currate=1;			
if(isset($_POST['currate'])){
$currate=$_POST['currate'];
}
$nilaidpidr=0;			
if(isset($_POST['nilaidpconv'])){
$nilaidpidr=$_POST['nilaidpconv'];
}
$rtnpersen=0;			
if(isset($_POST['retensi'])){
$rtnpersen=$_POST['retensi'];
}
$nilairtnidr=0;			
if(isset($_POST['nilairetensiconv'])){
$nilairtnidr=$_POST['nilairetensiconv'];
}
$nilairtn=0;
if($nilairtnidr>0){
$nilairtn=$nilairtnidr/$currate;
}			
	
$textsearch="";			
if(isset($_POST['textsearch'])){
$textsearch=$_POST['textsearch'];
}
	switch($method){
		case 'Listcip':
			$str="select nocip,keterangan,isposting from ".$dbname.".log_cipht 
				  where substr(nocip,17,5) = '".$_SESSION['empl']['lokasitugas']."' ";
			if(trim($textsearch)!=""){
				$str.=" AND (nocip like '%".trim($textsearch)."%' OR keterangan like '%".trim($textsearch)."%') ";
			}
			$str.=" having isposting is null";
			$rs=$eksi->ssql($str);
			$string="<table>
					<tr class=rowheader>
					<td>No</td><td>No CIP</td><td>keterangan</td>
					</tr> ";
			$no=1;
			foreach($rs as $rr){
				$string.="<tr class=rowcontent ondblclick=\"clickPilih('".$rr['nocip']."');\"><td>".$no."</td><td>".$rr['nocip']."</td><td>".$rr['keterangan']."</td></tr>";
				$no+=1;
			}
			$string.="</table>";
			echo $string;
		break;
		case 'Listpihak2':
			$str="SELECT supplierid,namasupplier FROM ".$dbname.".log_5klsupplier a INNER JOIN ".$dbname.".log_5supplier b on a.kode = b.kodekelompok WHERE tipe='KONTRAKTOR' ";
			if(trim($textsearch)!=""){
				$str.=" AND (supplierid like '%".trim($textsearch)."%' OR namasupplier like '%".trim($textsearch)."%') ";
			}
			$str.=" ORDER BY supplierid,namasupplier ASC";
			$rs=$eksi->ssql($str);
			$string="<table>
					<tr class=rowheader>
					<td>No</td><td>Kode</td><td>Nama</td>
					</tr> ";
			$no=1;
			foreach($rs as $rr){
				$string.="<tr class=rowcontent ondblclick=\"clickPilihPihak2('".$rr['supplierid']."','".$rr['namasupplier']."');\"><td>".$no."</td><td>".$rr['supplierid']."</td><td>".$rr['namasupplier']."</td></tr>";
				$no+=1;
			}
			$string.="</table>";
			echo $string;
		break;
		
		case 'validpihak2':
			$str="SELECT supplierid,namasupplier FROM ".$dbname.".log_5klsupplier a INNER JOIN ".$dbname.".log_5supplier b on a.kode = b.kodekelompok WHERE tipe='KONTRAKTOR'
				AND supplierid = '".trim($textsearch)."' ORDER BY supplierid,namasupplier ASC LIMIT";
			$rs=$eksi->ssql($str);
			$string="";
			foreach($rs as $rr){
				$string=$rr['namasupplier'];
			}
			echo $string;
		break;
		
		case 'validasi':
			$str="SELECT * FROM ".$dbname.".log_spkht_new 
				  WHERE createby=".strval($_SESSION['standard']['userid'])." 
				  AND nospk='".$nospk."'";
			$rsl=$eksi->ssqlnum($str);
			if($rsl>0){
				echo "VALID";
			} else{
				echo "GAGAL: NO SPK (".$nospk.") USER ID (".$_SESSION['standard']['userid'].")";
			}
		break;
		case 'delete':
			$strx="delete from ".$dbname.".log_spkht_new where nospk='".$nospk."'";
			  if(!mysql_query($strx)){
				  echo $_SESSION['lang']['alertfail']. " : ".addslashes(mysql_error($conn));
			  }	else {
				  echo $_SESSION['lang']['alertdelete'];
			  }
		break;
		case 'update':		
		
            $InsertLog = array(
				'tipe'			=> $tipe,
				'nmkerja'		=> "'".$nmkerja."'",
				'act'			=> "'".$act."'",
				'cip'			=> "'".$cip."'",
				'pihak1'		=> "'".$pihak1."'",
				'pihak2'		=> "'".$pihak2."'",
				'noreff'		=> "'".$noreff."'",
				'mu'			=> "'".$mu."'",
				'nilai'			=> $nilai,
				'waktu'			=> "'".$waktu."'",
				'bayar'			=> "'".trim(preg_replace("/\n/", "<br />", $bayar))."'",
				'garansi'		=> "'".$garansi."'",
				'lain'			=> "'".trim(preg_replace("/\n/", "<br />", $lain))."'",
				'ppnpersen'		=> "'".$persenppn[0]."'",
				'nilaippn'		=> $nilaippn,
				'pphpersen'		=> "'".$persenpph[0]."'",
				'nilaipph'		=> $nilaipph,
				'muspk'			=> "'".$muspk."'",
				'currate'		=> $currate,
				'nilaispk'		=> $nilaispk,
				'nilaispkidr'	=> $nilaispkidr,
				'dppersen'		=> $dppersen,
				'nilaidp'		=> $nilaidp,
				'nilaidpidr'	=> $nilaidpidr,
				'rtnpersen'		=> $rtnpersen,
				'nilairtn'		=> $nilairtn,
				'nilairtnidr'	=> $nilairtnidr,
				'penalti'		=> "'".$penalti."'",
				'approval'		=> $approval,
				'tglspk'		=> "'".date('Y-m-d', strtotime($_POST['tglspk']))."'",
				'tglterima'		=> "'".date('Y-m-d', strtotime($_POST['tglterima']))."'",
				'updateby'		=> strval($_SESSION['standard']['userid']),
				'updated' 		=> "'".date('Y-m-d H:i:s')."'"
            );
            $ssql=$eksi->genSQL('log_spkht_new',$InsertLog,true)." where nospk = '".$eksi->codesc($nospk)."'";
            $eksi->exc($ssql);
            echo $_SESSION['lang']['alertupdate'];

		break;
		case 'insert':
            $InsertLog = array(
				'nospk'			=> "'".$eksi->codesc($nospk)."'",
				'tipe'			=> $tipe,
				'nmkerja'		=> "'".$nmkerja."'",
				'act'			=> "'".$act."'",
				'cip'			=> "'".$cip."'",
				'pihak1'		=> "'".$pihak1."'",
				'pihak2'		=> "'".$pihak2."'",
				'noreff'		=> "'".$noreff."'",
				'mu'			=> "'".$mu."'",
				'nilai'			=> $nilai,
				'waktu'			=> "'".$waktu."'",
				'bayar'			=> "'".trim(preg_replace("/\n/", "<br />", $bayar))."'",
				'garansi'		=> "'".$garansi."'",
				'lain'			=> "'".trim(preg_replace("/\n/", "<br />", $lain))."'",
				'ppnpersen'		=> "'".$persenppn[0]."'",
				'nilaippn'		=> $nilaippn,
				'pphpersen'		=> "'".$persenpph[0]."'",
				'nilaipph'		=> $nilaipph,
				'muspk'			=> "'".$muspk."'",
				'currate'		=> $currate,
				'nilaispk'		=> $nilaispk,
				'nilaispkidr'	=> $nilaispkidr,
				'dppersen'		=> $dppersen,
				'nilaidp'		=> $nilaidp,
				'nilaidpidr'	=> $nilaidpidr,
				'rtnpersen'		=> $rtnpersen,
				'nilairtn'		=> $nilairtn,
				'nilairtnidr'	=> $nilairtnidr,
				'penalti'		=> "'".$penalti."'",
				'kodeorg'		=> "'".$_SESSION['empl']['lokasitugas']."'",
				'approval'		=> $approval,
				'tgltransaksi'	=> "'".date('Y-m-d H:i:s')."'",
				'tglspk'		=> "'".date('Y-m-d', strtotime($_POST['tglspk']))."'",
				'tglterima'		=> "'".date('Y-m-d', strtotime($_POST['tglterima']))."'",
				'createby'		=> strval($_SESSION['standard']['userid']),
				'updateby'		=> strval($_SESSION['standard']['userid']),
				'updated' 		=> "'".date('Y-m-d H:i:s')."'"
            );
            $ssql=$eksi->genSQL('log_spkht_new',$InsertLog,false);
            $eksi->exc($ssql);
            echo $_SESSION['lang']['alertinsert1'];
		break;

		case 'cekspk':
            $cek  = "";
            $cekx = "select nospk from ".$dbname.".log_spkht_new where nospk='".$eksi->codesc($nospk)."'";
            $resx = mysql_query($cekx);
            while($bar=mysql_fetch_object($resx)){
                $cek =$bar->nospk;
            }
            if($cek == $eksi->codesc($nospk)) {
                echo "No SPK ". $_SESSION['lang']['sudahdipakai'];
            }
		break;

		case 'refresh_data':
			$limit=10;
			$page=0;
			if(isset($_POST['page'])){
			$page=$_POST['page'];
			if($page<0)
			$page=0;
			}
			$offset=$page*$limit;
			$filter1="";
			if(isset($_POST['filter'])){
				$filter1=$_POST['filter'];
			}	
			
			$keyword="";
			if(isset($_POST['keyword'])){
				$keyword=$_POST['keyword'];
			}
			
			$filter = " WHERE kodeorg='".$_SESSION['empl']['lokasitugas']."'";
			
			if($filter1!='' && $keyword!='') {
				
				if(trim($filter1)=='nama'){				
					$filter.= " AND pihak2 IN(SELECT supplierid FROM ".$dbname.".log_5klsupplier a INNER JOIN ".$dbname.".log_5supplier b on a.kode = b.kodekelompok WHERE tipe='KONTRAKTOR' AND namasupplier LIKE '%".$keyword."%')";
				
					
				}
				if(trim($filter1)=='tglspk'){
					$filter.= " AND ".$filter1." ='".$eksi->ymd(str_replace("/","-",$keyword))."'";
				}
				if(trim($filter1)!='tglspk' && trim($filter1)!='nama'){
					$filter.= " AND ".$filter1." LIKE '%".$keyword."%'";
				}

				$strVen = "";
				
			}
			
			
			$str=" select *,
			ifnull((SELECT x.deskripsi FROM log_master_pajak x WHERE x.kode=log_spkht_new.ppnpersen LIMIT 1),' ')as namappn,
			ifnull((SELECT x.deskripsi FROM log_master_pajak x WHERE x.kode=log_spkht_new.pphpersen LIMIT 1),' ')as namapph,
			ifnull((select sum(x.persen) FROM log_spk_ba x where x.spk=log_spkht_new.nospk AND x.posting=1),0) as progressBA 
			from ".$dbname.".log_spkht_new ".$filter." order by tgltransaksi desc limit ".$offset.",".$limit." ";
			$sql=" select count(nospk) as jmlhrow from ".$dbname.".log_spkht_new ".$filter." order by tgltransaksi desc";
			$filter = "";
			#print_r($str);
			$res=mysql_query($str);
			$jlhbrs = 0;
			$no=($page*$limit);
			$query=mysql_query($sql) or die(mysql_error());
			while($jsl=mysql_fetch_object($query)){
			$jlhbrs= $jsl->jmlhrow;
			}
			while($bar=mysql_fetch_object($res)){
				$no+=1;
				if($bar->tipe==0){ $tipe="SPK Kecil";} else { $tipe="SPK Besar";}
				if($bar->link1==""){ $img = "";} else { $img="<a href=".$bar->link1." target='_blank'><img src='images/zoom.png' title='Detail Link' class='resicon'></a>";}

				$strorg = "select namaorganisasi from ".$dbname.".organisasi where kodeorganisasi='".$bar->pihak1."'";
				$resorg = mysql_query($strorg);
				$barorg = mysql_fetch_object($resorg);

				$strVen = "SELECT supplierid,namasupplier FROM ".$dbname.".log_5klsupplier a INNER JOIN ".$dbname.".log_5supplier b on a.kode = b.kodekelompok WHERE tipe='KONTRAKTOR' AND supplierid='".$bar->pihak2."'";
				$resven = mysql_query($strVen);
				$barven = mysql_fetch_object($resven);

				$strAct = "select kodekegiatan,namakegiatan from ".$dbname.".setup_kegiatan where kodekegiatan='".$bar->act."'";
				$resAct = mysql_query($strAct);
				$barAct = mysql_fetch_object($resAct);

				$strppn = "select rate from ".$dbname.".log_master_pajak where kode='".trim($bar->ppnpersen)."' LIMIT 1";
				$resppn = mysql_query($strppn);
				$barppn = mysql_fetch_object($resppn);

				$strpph = "select rate from ".$dbname.".log_master_pajak where kode='".trim($bar->pphpersen)."' LIMIT 1";
				$respph = mysql_query($strpph);
				$barpph = mysql_fetch_object($respph);

				$count = mysql_query("SELECT count(spk) as jumlah from ".$dbname.".log_spk_ba where spk='".$bar->nospk."'");
				$cekba = mysql_fetch_object($count);

				$totalSpkBa = mysql_fetch_object(mysql_query("SELECT count(spk) as totalspkba FROM ".$dbname.".log_spk_ba where spk = '".$bar->nospk."'"));
				$totalSpkPosting = mysql_fetch_object(mysql_query("SELECT count(spk) as totalspkposting FROM ".$dbname.".log_spk_ba where spk = '".$bar->nospk."' and posting=1"));

				if($bar->stat_release==0 && $bar->complete==0) {
					$rilis = "<img src='images/skyblue/posting.png' class='zImgBtn' onclick=rilis('".$bar->nospk."')>";
				}
				else if($bar->stat_release==1 && $bar->complete==1){
					$rilis = "<img src='images/skyblue/posted.png' class='zImgBtn' title='Release'>";
				}
				else {
					if($cekba->jumlah > 0){
						$rilis = "<img src='images/skyblue/posted.png' class='zImgBtn' onclick=\"alert('".$_SESSION['lang']['alertunrilis']."')\">";
					}
					else {
						$rilis = "<img src='images/skyblue/posted.png' class='zImgBtn' onclick=unrilis('".$bar->nospk."')>";
					}
				}

				if($bar->stat_release==0 && $bar->complete==0){
					$complete = "";
				}
				else if($bar->stat_release==1 && $bar->complete==1){
					$complete = "<img src='images/skyblue/posted.png' class='zImgBtn' title='SPK Komplit'>";
				}
				else {
					if($cekba->jumlah == 0){
						$complete = "<img src='images/skyblue/posting.png' class='zImgBtn' onclick=belumAdaBa('".$bar->nospk."')>";
					}
					else if($totalSpkBa->totalspkba != $totalSpkPosting->totalspkposting) {
						$complete = "<img src='images/skyblue/posting.png' class='zImgBtn' onclick=\"alert('Semua BA harus posting terlebih dahulu')\"> ".$bar->progressBA." % ";
					}
					else if($totalSpkBa->totalspkba == $totalSpkPosting->totalspkposting) {
						$complete = "<img src='images/skyblue/posting.png' class='zImgBtn' onclick=completed('".$bar->nospk."')> ".$bar->progressBA." % ";
					}
					else {
						$complete = "";
					}
				}


				if($bar->nilaippn==0){ $ppn="0-0";} else {$ppn= $bar->ppnpersen."-".$barppn->rate;}
				if($bar->nilaipph==0){ $pph="0-0";} else {$pph= $bar->pphpersen."-".$barpph->rate;}

				if($bar->stat_release==0){
					$hapus = "<img src=images/application/application_delete.png class=resicon  title='".$_SESSION['lang']['delete']."' onclick=\"del('".$bar->nospk."');\">";
					$edit = "<img src=images/application/application_edit.png class=resicon  title='".$_SESSION['lang']['edit']."' onclick=\"edit('".$bar->nospk."','".$bar->tipe."','".$bar->nmkerja."','".$bar->act."','".$bar->cip."','".$bar->pihak1."','".$bar->pihak2."','".$bar->noreff."','".$bar->mu."','".number_format($bar->nilai,2)."','".$bar->waktu."','".$bar->bayar."','".$bar->garansi."','".$bar->lain."','".$ppn."','".number_format($bar->nilaippn,2)."','".$pph."','".number_format($bar->nilaipph,2)."','".$bar->muspk."','".number_format($bar->nilaispk,2)."','".$bar->dppersen."','".number_format($bar->nilaidp,2)."','".$bar->penalti."','".$bar->approval."','".date('d-m-Y', strtotime($bar->tglspk))."','".date('d-m-Y', strtotime($bar->tglterima))."','".number_format($bar->nilaispkidr)."','".number_format($bar->currate)."','".number_format($bar->nilaidpidr)."','".number_format($bar->rtnpersen)."','".number_format($bar->nilairtn)."','".number_format($bar->nilairtnidr)."','".$barven->namasupplier."');\">";
				}
				else {
					$hapus = "<img src=images/icons/lock.png class=resicon  title='".$_SESSION['lang']['delete']."' onclick=\"return alert('".$_SESSION['lang']['alertdeleterilis']."');\">";
					$edit= "<img src=images/icons/lock.png class=resicon  title='".$_SESSION['lang']['edit']."' onclick=\"return alert('".$_SESSION['lang']['alertupdaterilis']."');\">";
				}

				echo"<tr class=rowcontent>
					  <td>".$no."</td>
					  <td>".$tipe."</td>
					  <td>".$eksi->decodesc($bar->nospk)."</td>
					  <td>".$eksi->dmy($bar->tglspk)."</td>
					  <td>".$bar->noreff."</td>
					  <td>".$bar->muspk."</td>
					  <td align='right'>".number_format($bar->nilai,2)."</td>
					  <td>".$bar->namappn."</td>
					  <td>".$bar->namapph."</td>
					  <td>".$eksi->decodesc($barAct->namakegiatan)."</td>
					  <td>".$bar->cip."</td>
					  <td>".$barorg->namaorganisasi."</td>
					  <td>".$barven->namasupplier."</td>
					  <td align='center'>".$rilis."</td>
					  <td align='center'>".$complete."</td>
					  <td align=center>".$edit."</td>
					  <td align=center>".$hapus."</td>
					  <td align=center><img src=images/pdf.jpg class=resicon onclick=\"masterPDF('log_spkht_new','".$bar->tipe.",".$eksi->decodesc($bar->nospk)."','','log_slave_spk_print',event);\"></td>
					  <td align=center>
					  <img src=images/application/application_link.png class=resicon  title='Link' onclick=\"inserLink('Link Dokumen','<fieldset><table><tr><td id=lbl_link></td><td><textarea id=link1_".$no."></textarea></td></tr><tr><td></td><td><button onclick=saveLink(".$no.")>".$_SESSION['lang']['save']."</button><input type=hidden id=spkno value=".$eksi->decodesc($bar->nospk)."></td></tr></table></fieldset><div id=container></div>',".$no.")\";>
					  ".$img."
					  </td>
				      <input type='hidden' id='url1_".$no."' value='".$bar->link1."'/>
					  </tr>";
			}
				echo "<tr class='footercolor'>
					<td colspan=16 align=center>
					".(($page*$limit)+1)." to ".(($page+1)*$limit)." Of ".  $jlhbrs."
					<br />
					<button class=mybutton onclick=cariBast(".($page-1).");>".$_SESSION['lang']['pref']."</button>
					<button class=mybutton onclick=cariBast(".($page+1).");>".$_SESSION['lang']['lanjut']."</button>
					</td>
					</tr>";
		break;

		case 'link':
            $InsertLog = array(
				'link1'	=> "'".$_POST['links']."'",
            );
            $ssql=$eksi->genSQL('log_spkht_new',$InsertLog,true)." where nospk = '".$nospk."'";
            $eksi->exc($ssql);
            echo $_SESSION['lang']['alertinsert1'];
		break;

		case 'InsertLinkPO':
			$optPo="<option value=''>Pilih PO</option>";
			$rs=$eksi->ssql("select induk from ".$dbname.".organisasi WHERE kodeorganisasi='".$_SESSION['org']['kodepusat']."'");
			$kodeinduk="";
			foreach($rs as $r){
				$kodeinduk=$r['induk'];
			}
			$filterw=" AND nocounter LIKE '%SO%'";
			if($_SESSION['empl']['pusat']==1){
				$filterw=" AND nocounter LIKE '%HO%'";
			}
			$strPo = "select nopo,nocounter from ".$dbname.".log_poht 
			where kodeorg ='".$kodeinduk."' AND stat_release=1 AND nocounter is not null ".$filterw;
			
			$resPo=mysql_query($strPo);
			while($bar=mysql_fetch_object($resPo)){
			   $optPo.="<option value='".$bar->nopo."'>".$bar->nocounter."</option>";
			}
			echo "Link PO : <select id='linkpo'>".$optPo."</select> <button class='mybutton' onclick='saveLinkPO();' id='submit'>".$_SESSION['lang']['save']."</button>";
			echo "<br/><br/>";
			echo "<input type='hidden' id='id' value='0'>";
			echo "<input type='hidden' id='methodlink' value='saveLinkPO'>";
			echo "<input type='hidden' id='nospk' value='".$_POST['nospk']."'>";
			echo "<table class='sortable' cellspacing='1' border='0'>";
			echo "<tr class='rowheader'>
			<th>No</th>
			<th>No PO</th>
			<th>".$_SESSION['lang']['edit']."</th>
			<th>".$_SESSION['lang']['delete']."</th>
			</tr>";

			$str = "select a.id,a.po,b.nocounter,a.spk from ".$dbname.".log_spkdt_new a,".$dbname.".log_poht b 
			where a.po=b.nopo AND a.spk='".$_POST['nospk']."' order by a.po asc";
			$res=mysql_query($str);

			while($bar=mysql_fetch_object($res)){
				$no+=1;
				echo "
				<tr class=rowcontent>
					<td>".$no."</td>
					<td>".$bar->nocounter."</td>
					<td align=center><img src=images/application/application_edit.png class=resicon  title='".$_SESSION['lang']['edit']."' onclick=\"editLinkPo('".$bar->id."','".$bar->po."','".$bar->spk."');\"></td>
					<td align=center><img src=images/application/application_delete.png class=resicon  title='".$_SESSION['lang']['delete']."' onclick=\"delLinkPo('".$bar->id."');\"> </td>
				</tr>
				";
			}

			echo "</table>";
		break;

		case 'saveLinkPO':
            $InsertLog = array(
				'po'	=> "'".$_POST['po']."'",
				'spk'	=> "'".strtoupper($_POST['nospk'])."'",
            );
            $ssql=$eksi->genSQL('log_spkdt_new',$InsertLog,false);
            $eksi->exc($ssql);
           // echo $_SESSION['lang']['alertinsert1'];
		break;

		case 'delLinkPo':
			$strx="delete from ".$dbname.".log_spkdt_new where id='".$_POST['id']."'";
			  if(!mysql_query($strx)){
				  echo $_SESSION['lang']['alertfail']. " : ".addslashes(mysql_error($conn));
			  }	else {
				  //echo $_SESSION['lang']['alertdelete'];
			  }
		break;

		case 'updateLinkPO':
            $InsertLog = array(
				'po'	=> "'".$_POST['po']."'",
				'spk'	=> "'".$_POST['nospk']."'"
            );
            $ssql=$eksi->genSQL('log_spkdt_new',$InsertLog,true)." where id = '".$id."'";
            $eksi->exc($ssql);
            echo $_SESSION['lang']['alertupdate'];
		break;

		case 'updatestatus':
            $InsertLog = array(
				'stat_release'	=> 1, 'release_date' => "'".date('Y-m-d H:i:s')."'"
            );
            $ssql=$eksi->genSQL('log_spkht_new',$InsertLog,true)." where nospk = '".$id."'";
            $eksi->exc($ssql);
            echo $_SESSION['lang']['alertupdate'];
		break;

		case 'updatestatus1':
            $InsertLog = array(
				'stat_release'	=> 0,'release_date' => "'0000-00-00'"
            );
            $ssql=$eksi->genSQL('log_spkht_new',$InsertLog,true)." where nospk = '".$id."'";
            $eksi->exc($ssql);
            echo $_SESSION['lang']['alertupdate'];
		break;

		case 'statuscomplete':
			$InsertLog = array(
				'complete'	=> 1
            );
			$ssql=$eksi->genSQL('log_spkht_new',$InsertLog,true)." where nospk = '".$id."'";
			$eksi->exc($ssql);
			echo $_SESSION['lang']['alertupdate'];

		break;

		case 'loadBA':
			$limit=10;
			$page=0;
			if(isset($_POST['page'])){
			$page=$_POST['page'];
			if($page<0)
			$page=0;
			}
			$offset=$page*$limit;

			if($_POST['filter']!='' && $_POST['keyword']!='') {
				$filter = "WHERE ".$_POST['filter']." LIKE '%".$_POST['keyword']."%' AND stat_release=1 AND kodeorg='".$_SESSION['empl']['lokasitugas']."'";
			}
			else {
				$filter = "WHERE stat_release=1 AND kodeorg='".$_SESSION['empl']['lokasitugas']."'";
			}

			$str=" select * from ".$dbname.".log_spkht_new ".$filter." order by tgltransaksi desc limit ".$offset.",".$limit." ";
			$sql=" select count(nospk) as jmlhrow from ".$dbname.".log_spkht_new ".$filter." order by tgltransaksi desc";
			
			//print_r($str);
			
			$res=mysql_query($str);
			$jlhbrs = 0;
			$no=($page*$limit);
			$query=mysql_query($sql) or die(mysql_error());
			while($jsl=mysql_fetch_object($query)){
			$jlhbrs= $jsl->jmlhrow;
			}
			while($bar=mysql_fetch_object($res)){
				$no+=1;
				if($bar->tipe==0){ $tipe="Kecil";} else { $tipe="Besar";}
				if($bar->link1==""){ $img = "";} else { $img="<a href=".$bar->link1." target='_blank'><img src='images/zoom.png' title='Detail Link' class='resicon'></a>";}

				$strorg = "select namaorganisasi from ".$dbname.".organisasi where kodeorganisasi='".$bar->pihak1."'";
				$resorg = mysql_query($strorg);
				$barorg = mysql_fetch_object($resorg);

				$strVen = "SELECT supplierid,namasupplier FROM ".$dbname.".log_5klsupplier a INNER JOIN ".$dbname.".log_5supplier b on a.kode = b.kodekelompok WHERE tipe='KONTRAKTOR' AND supplierid='".$bar->pihak2."'";
				$resven = mysql_query($strVen);
				$barven = mysql_fetch_object($resven);

				$strAct = "select kodekegiatan,namakegiatan from ".$dbname.".setup_kegiatan where kodekegiatan='".$bar->act."'";
				$resAct = mysql_query($strAct);
				$barAct = mysql_fetch_object($resAct);

				$strppn = "select rate from ".$dbname.".log_master_pajak where kode='".$bar->ppnpersen."'";
				$resppn = mysql_query($strppn);
				$barppn = mysql_fetch_object($resppn);

				$strpph = "select rate from ".$dbname.".log_master_pajak where kode='".$bar->pphpersen."'";
				$respph = mysql_query($strpph);
				$barpph = mysql_fetch_object($respph);

				if($bar->stat_release==0) {
						$rilis = "<img src='images/skyblue/posting.png' class='zImgBtn' onclick=rilis('".$bar->nospk."')>";
				}
				else {
						$rilis = "<img src='images/skyblue/posted.png' class='zImgBtn' onclick=unrilis('".$bar->nospk."')>";
				}

				if($bar->stat_release==0){ $status="Belum Release";} else { $status="Sudah Release";}
				
				echo"<tr class=rowcontent>
					  <td>".$no."</td>
					  <td>".$tipe."</td>
					  <td>".$eksi->decodesc($bar->nospk)."</td>
					  <td>".$bar->noreff."</td>
					  <td align='right'>".number_format($bar->nilaispk,2)."</td>
					  <td>".$barAct->namakegiatan."</td>
					  <td>".$bar->cip."</td>
					  <td>".$barorg->namaorganisasi."</td>
					  <td>".$barven->namasupplier."</td>					  
					  <td>".$status."</td>
					  <td align=center><a href='ba_spk_detail.php?nospk=".$bar->nospk."&tipe=".$tipe."&nmkerja=".$bar->nmkerja."&mu=".$bar->mu."&nilaispk=".$bar->nilaispk."&nilaippn=".$bar->nilaippn."&nilaipph=".$bar->nilaipph."&mu=".$bar->mu."&muspk=".$bar->muspk."&ppnpersen=".$bar->ppnpersen."-".$barppn->rate."&pphpersen=".$bar->pphpersen."-".$barpph->rate."&nilai=".$bar->nilai."'><img src=images/icons/baspk.png class=resicon  title='".$_SESSION['lang']['edit']."'></a></td>
				      <input type='hidden' id='url1_".$no."' value='".$bar->link1."'/>
					  <td align=center><img src=images/pdf.jpg class=resicon onclick=\"masterPDF('log_spkht_new','".$bar->tipe.",".$eksi->decodesc($bar->nospk)."','','log_slave_spk_print',event);\"></td>
					  </tr>";
			}
				echo "<tr class='footercolor'>
					<td colspan=16 align=center>
					".(($page*$limit)+1)." to ".(($page+1)*$limit)." Of ".  $jlhbrs."
					<br />
					<button class=mybutton onclick=cariBastqqq(".($page-1).");>".$_SESSION['lang']['pref']."</button>
					<button class=mybutton onclick=cariBastqqq(".($page+1).");>".$_SESSION['lang']['lanjut']."</button>
					</td>
					</tr>";
		break;

		case 'loadDataPostingBA':
			$limit=10;
			$page=0;
			if(isset($_POST['page'])){
			$page=$_POST['page'];
			if($page<0)
			$page=0;
			}
			$offset=$page*$limit;

			if($_POST['filter']!='' && $_POST['keyword']!='') {
				$filter = "WHERE ".$_POST['filter']." LIKE '%".$_POST['keyword']."%' AND stat_release=1 AND kodeorg='".$_SESSION['empl']['lokasitugas']."'";
			}
			else {
				$filter = "WHERE stat_release=1 AND kodeorg='".$_SESSION['empl']['lokasitugas']."'";
			}

			$str=" select * from ".$dbname.".log_spkht_new ".$filter." order by tgltransaksi desc limit ".$offset.",".$limit." ";
			$sql=" select count(nospk) as jmlhrow from ".$dbname.".log_spkht_new ".$filter." order by tgltransaksi desc";
			$res=mysql_query($str);
			$jlhbrs = 0;
			$no=($page*$limit);
			$query=mysql_query($sql) or die(mysql_error());
			while($jsl=mysql_fetch_object($query)){
			$jlhbrs= $jsl->jmlhrow;
			}
			while($bar=mysql_fetch_object($res)){
				$no+=1;
				if($bar->tipe==0){ $tipe="Kecil";} else { $tipe="Besar";}
				if($bar->link1==""){ $img = "";} else { $img="<a href=".$bar->link1." target='_blank'><img src='images/zoom.png' title='Detail Link' class='resicon'></a>";}

				$strorg = "select namaorganisasi from ".$dbname.".organisasi where kodeorganisasi='".$bar->pihak1."'";
				$resorg = mysql_query($strorg);
				$barorg = mysql_fetch_object($resorg);

				$strVen = "SELECT supplierid,namasupplier FROM ".$dbname.".log_5klsupplier a INNER JOIN ".$dbname.".log_5supplier b on a.kode = b.kodekelompok WHERE tipe='KONTRAKTOR' AND supplierid='".$bar->pihak2."'";
				$resven = mysql_query($strVen);
				$barven = mysql_fetch_object($resven);

				$strAct = "select kodekegiatan,namakegiatan from ".$dbname.".setup_kegiatan where kodekegiatan='".$bar->act."'";
				$resAct = mysql_query($strAct);
				$barAct = mysql_fetch_object($resAct);

				$strppn = "select rate,nama from ".$dbname.".log_master_pajak where kode='".$bar->ppnpersen."'";
				$resppn = mysql_query($strppn);
				$barppn = mysql_fetch_object($resppn);

				$strpph = "select rate,nama from ".$dbname.".log_master_pajak where kode='".$bar->pphpersen."'";
				$respph = mysql_query($strpph);
				$barpph = mysql_fetch_object($respph);

				if($bar->stat_release==0) {
						$rilis = "<img src='images/skyblue/posting.png' class='zImgBtn' onclick=rilis('".$bar->nospk."')>";
				}
				else {
						$rilis = "<img src='images/skyblue/posted.png' class='zImgBtn' onclick=unrilis('".$bar->nospk."')>";
				}
				
				if($bar->stat_release==0){ $status="Belum Release";} else { $status="Sudah Release";}
				
				echo"<tr class=rowcontent>
					  <td>".$no."</td>
					  <td>".$tipe."</td>
					  <td>".$bar->nospk."</td>
					  <td>".$bar->noreff."</td>
					  <td align='right'>".number_format($bar->nilai,2)."</td>
					  <td>".$barppn->nama."</td>
					  <td>".$barpph->nama."</td>
					  <td>".$barAct->namakegiatan."</td>
					  <td>".$bar->cip."</td>
					  <td>".$barorg->namaorganisasi."</td>
					  <td>".$barven->namasupplier."</td>					  
					  <td>".$status."</td>	
					  <td align=center><a href='ba_spk_detail_posting.php?nospk=".$bar->nospk."&tipe=".$tipe."&nmkerja=".$bar->nmkerja."&mu=".$bar->mu."&nilaispk=".$bar->nilaispk."&nilaippn=".$bar->nilaippn."&nilaipph=".$bar->nilaipph."&mu=".$bar->mu."&muspk=".$bar->muspk."&ppnpersen=".$bar->ppnpersen."-".$barppn->rate."&pphpersen=".$bar->pphpersen."-".$barpph->rate."'><img src=images/icons/baspk.png class=resicon  title='Posting BA'></a></td>
				      <input type='hidden' id='url1_".$no."' value='".$bar->link1."'/>
					  <td align=center><img src=images/pdf.jpg class=resicon onclick=\"masterPDF('log_spkht_new','".$bar->tipe.",".$eksi->decodesc($bar->nospk)."','','log_slave_spk_print',event);\"></td>	
					  </tr>";
			}
				echo "<tr class='footercolor'>
					<td colspan=16 align=center>
					".(($page*$limit)+1)." to ".(($page+1)*$limit)." Of ".  $jlhbrs."
					<br />
					<button class=mybutton onclick=cariBastxxx(".($page-1).");>".$_SESSION['lang']['pref']."</button>
					<button class=mybutton onclick=cariBastxxx(".($page+1).");>".$_SESSION['lang']['lanjut']."</button>
					</td>
					</tr>";
		break;

		case 'saveba':
		    $max = mysql_fetch_object(mysql_query("SELECT max(nourut) as nourut FROM ".$dbname.".log_spk_ba where spk = '".$_POST['spk']."'"));
			$nourut = $max->nourut+1;
			if (trim($_POST['namaba'])==""){
				exit("Warning : Nama BA wajib diisi.");
			}
			if ($_POST['persen']<=0){
				exit("Warning : Persentase harus diisi.");
			}
			
			$rs=$eksi->ssqlnum("SELECT * FROM ".$dbname.".log_spk_ba WHERE namaba='".$_POST['namaba']."' LIMIT 1");
			if ($rs>0){
				exit("Warning : Nama BA sudah pernah ada.");
			}
			$total = mysql_fetch_object(mysql_query("SELECT sum(persen) as persen1 FROM ".$dbname.".log_spk_ba where spk = '".$_POST['spk']."'"));
			if($total->persen1 + $_POST['persen'] > 100) {
					echo "Warning : Persentase tidak boleh melebihi 100%";
			}
			else {
				
			
				$keterangan=$_POST['deskripsi'];
				$keterangan=htmlspecialchars($keterangan, ENT_QUOTES);
				$keterangan=htmlspecialchars($keterangan, ENT_COMPAT);
				$keterangan=htmlspecialchars($keterangan, ENT_NOQUOTES);
				$keterangan=htmlspecialchars($keterangan, ENT_NOQUOTES);
				
				$InsertLog = array(
						'spk'			=> "'".$_POST['spk']."'",
						'tipeba'		=> $_POST['tipeba'],
						'namaba'		=> "'".$_POST['namaba']."'",
						'persen'		=> $_POST['persen'],
						'deskripsi'		=> "'".trim($keterangan)."'",
						'dppba'			=> "'".$_POST['dppba']."'",
						'nominaldpp' 	=> $_POST['nominaldpp'],
						'ppn'		 	=> "'".$exppn[0]."'",
						'nominalppn' 	=> $_POST['nominalppn'],
						'pph'		 	=> "'".$expph[0]."'",
						'nominalpph' 	=> $_POST['nominalpph'],
						'totalba'	 	=> "'".$_POST['totalba']."'",
						'nominaltotal' 	=> $_POST['nominaltotal'],
						'tgltrans'	 	=> "'".date('Y-m-d H:i:s')."'",
						'tglba'	 		=> "'".date('Y-m-d', strtotime($_POST['tglba']))."'",
						'createby' 		=> $_SESSION['standard']['userid'],
						'updateby' 		=> $_SESSION['standard']['userid'],
						'updated'	 	=> "'".date('Y-m-d H:i:s')."'",
						'nourut' 		=> "'".$nourut."'"
				);

				$ssql=$eksi->genSQL('log_spk_ba',$InsertLog,false);
				$eksi->exc($ssql);
				echo $_SESSION['lang']['alertinsert1'];
			}
		break;

		case 'loadDetailBA':
			$limit=10;
			$page=0;
			if(isset($_POST['page'])){
			$page=$_POST['page'];
			if($page<0)
			$page=0;
			}
			$offset=$page*$limit;

			if($_POST['filter']!='' && $_POST['keyword']!='') {
				$filter = "WHERE ".$_POST['filter']." LIKE '%".$_POST['keyword']."%' AND spk = '".$_POST['spk']."'";
			}
			else {
				$filter = "WHERE spk = '".$_POST['spk']."'";
			}

			$str=" select a.dppba,a.`id`,b.nmkerja,a.spk,a.tipeba,a.namaba,a.persen,a.deskripsi,a.nominaldpp,
				  a.ppn,a.nominalppn,a.pph,a.nominalpph,a.totalba,a.nominaltotal,a.link1,posting,b.tipe, tglba,
			ifnull((SELECT x.deskripsi FROM log_master_pajak x WHERE x.kode=a.ppn LIMIT 1),' ')as namappn,
			ifnull((SELECT x.deskripsi FROM log_master_pajak x WHERE x.kode=a.pph LIMIT 1),' ')as namapph,
			ifnull((select sum(x.persen) FROM log_spk_ba x where x.spk=a.spk AND x.`id`<=a.`id` AND x.posting=1),0) as progressBA 
				  from ".$dbname.".log_spk_ba a 
				  INNER JOIN ".$dbname.".log_spkht_new b ON a.spk = b.nospk ".$filter." 
				  order by b.tgltransaksi desc limit ".$offset.",".$limit." ";
			$sql=" select count(a.dppba) from ".$dbname.".log_spk_ba a INNER JOIN ".$dbname.".log_spkht_new b ON a.spk = b.nospk ".$filter." order by b.tgltransaksi desc";
			$res=mysql_query($str);
			$jlhbrs = 0;
			$no=($page*$limit);
			$query=mysql_query($sql) or die(mysql_error());
			while($jsl=mysql_fetch_object($query)){
				$jlhbrs= $jsl->jmlhrow;
			}
			while($bar=mysql_fetch_object($res)){
				$no+=1;
				if($bar->tipe==0){ $tipe = "Kecil";} else { $tipe = "Besar";}

				if($bar->link1==""){ $link = "";} else { $link="<a href='".$bar->link1."' target='_blank'><img src='images/zoom.png' title='Detail Link' class='resicon'></a>";}

				$strppn = "select rate from ".$dbname.".log_master_pajak where kode='".$bar->ppn."' LIMIT 1";
				
				
				$resppn = mysql_query($strppn);
				$barppn = mysql_fetch_object($resppn);

				$strpph = "select rate from ".$dbname.".log_master_pajak where kode='".$bar->pph."' LIMIT 1";
				$respph = mysql_query($strpph);
				$barpph = mysql_fetch_object($respph);


				if($bar->posting==0){
					$edit = "<img src=images/application/application_edit.png class=resicon  title='".$_SESSION['lang']['edit']."' onclick=\"editBA('".$bar->id."','".$bar->spk."','".$bar->tipeba."','".$bar->namaba."','".$bar->persen."','".$bar->deskripsi."','".$bar->dppba."','".number_format($bar->nominaldpp,2)."','".$bar->ppn."-".$barppn->rate."','". number_format($bar->nominalppn,2)."','".$bar->pph."-".$barpph->rate."','".number_format($bar->nominalpph,2)."','".$bar->totalba."','".number_format($bar->nominaltotal,2)."', '".date('d-m-Y', strtotime($bar->tglba))."','". number_format($bar->progressBA,2)."');\">";
					$delete = "<img src=images/application/application_delete.png class=resicon  title='".$_SESSION['lang']['delete']."' onclick=\"delBA('".$bar->id."');\">";
				}
				else {
					$edit = "<img src=images/icons/lock.png>";
					$delete = "<img src=images/icons/lock.png>";
				}

				echo"<tr class=rowcontent>
					  <td>".$no."</td>
					  <td>".$bar->spk."</td>
					  <td>".$tipe."</td>
					  <td>".$bar->nmkerja."</td>
					  <td>".$bar->namaba."</td>
					  <td>".$bar->persen."%</td>
					  <td align=right>".number_format($bar->nominaldpp,2)."</td>
					  <td align=right>".$bar->namappn."</td>
					  <td align=right>".$bar->namapph."</td>
					  <td align=right>".number_format($bar->nominaltotal,2)."</td>
					  <td align=center>".$edit."</td>
					  <td align=center>".$delete."</td>
					  <td align=center>
					  <img src=images/application/application_link.png class=resicon  title='Link' onclick=\"inserLink('Link Dokumen','<fieldset><table><tr><td></td><td><textarea id=link1_".$no."></textarea></td></tr><tr><td></td><td><button onclick=saveLinkBA(".$no.")>".$_SESSION['lang']['save']."</button><input type=hidden id=idx value=".$bar->id."></td></tr></table></fieldset><div id=container></div>',".$no.")\";>
					  ".$link."
					  </td>
					  <td align=center>
					  <img src=images/pdf.jpg class=resicon onclick=\"masterPDF('ba_spk_detail','".$bar->id.",".$bar->spk.",".$no."','','log_slave_spk_print_ba',event);\">
					  </td>
					  <td hidden='hidden' >".$bar->id."</td>
					  <input hidden='hidden' id='url1_".$no."' value='".$bar->link1."'/>
					  </tr>";
			}
				echo "<tr class='footercolor'>
					<td colspan=16 align=center>
					".(($page*$limit)+1)." to ".(($page+1)*$limit)." Of ".  $jlhbrs."
					<br />
					<button class=mybutton onclick=cariBast1(".($page-1).");>".$_SESSION['lang']['pref']."</button>
					<button class=mybutton onclick=cariBast1(".($page+1).");>".$_SESSION['lang']['lanjut']."</button>
					</td>
					</tr>";
		break;

		case 'updateba':
			$rs=$eksi->ssql("SELECT ppn,pph FROM ".$dbname.".log_spk_ba WHERE id = '".$_POST['id']."' LIMIT 1");
			$ppnpc='';
			$pphpc='';
			foreach($rs as $r){
				$ppnpc=$r['ppn'];
				$pphpc=$r['pph'];
			}
			$InsertLog = array(
					'spk'		=> "'".$_POST['spk']."'",
					'tipeba'	=> $_POST['tipeba'],
					'namaba'	=> "'".$_POST['namaba']."'",
					'persen'	=> $_POST['persen'],
					'deskripsi'		=> "'".trim(preg_replace("/\n/", "<br />", $_POST['deskripsi']))."'",
					'dppba'		=> "'".$_POST['dppba']."'",
					'nominaldpp' => $_POST['nominaldpp'],
					'ppn'		 => "'".$ppnpc."'",
					'nominalppn' => $_POST['nominalppn'],
					'pph'		 => "'".$pphpc."'",
					'nominalpph' => $_POST['nominalpph'],
					'totalba'	 => "'".$_POST['totalba']."'",
					'nominaltotal' => $_POST['nominaltotal'],
					'tglba'	 => "'".date('Y-m-d', strtotime($_POST['tglba']))."'",
					'updateby'	=> $_SESSION['standard']['userid'],
					'updated'	=> "'".date('Y-m-d H:i:s')."'",
			);
			$eksi->lock('log_spk_ba');
            $ssql=$eksi->genSQL('log_spk_ba',$InsertLog,true)." where id = '".$_POST['id']."'";
            $eksi->exc($ssql);
			$eksi->unlock();
            
            echo $_SESSION['lang']['alertupdate'];
		break;

		case 'delBA':
			$strx="delete from ".$dbname.".log_spk_ba where id='".$_POST['id']."'";
			  if(!mysql_query($strx)){
				  echo $_SESSION['lang']['alertfail']. " : ".addslashes(mysql_error($conn));
			  }	else {
				  echo $_SESSION['lang']['alertdelete'];
			  }
		break;

		case 'linkBA':
            $InsertLog = array(
				'link1'	=> "'".$_POST['links']."'",
            );
            $ssql=$eksi->genSQL('log_spk_ba',$InsertLog,true)." where id = '".$_POST['idx']."'";
            $eksi->exc($ssql);
            echo $_SESSION['lang']['alertinsert1'];
		break;

		case 'PostingBA':
			/* SPK Kecil */
			if($_POST['tipe']==0) {
				$qinv = mysql_query("SELECT status FROM ".$dbname.".keu_trx_ht WHERE nodokumen='".$_POST['spk']."'");
				$cinv = mysql_fetch_object($qinv);

				$qdp = mysql_query("SELECT nilaidp FROM ".$dbname.".log_spkht_new WHERE nospk='".$_POST['spk']."'");
				$cdp = mysql_fetch_object($qdp);

				$sltrx="SELECT b.id, a.pihak2, b.nominaldpp, a.nospk, b.namaba, b.nominalppn, b.nominalpph, a.muspk
						FROM ".$dbname.".log_spkht_new a
						INNER JOIN ".$dbname.".log_spk_ba b ON b.spk = a.nospk
						WHERE id = ".$_POST['id']." LIMIT 1";
						$restrx=$eksi->sSQL($sltrx);
						foreach($restrx as $bartrx){
							$noreff = $bartrx['nospk'].' | '.$bartrx['namaba'];
							//postSpkBaKecil($bartrx['id'],$bartrx['pihak2'],$bartrx['nominaldpp']+$bartrx['nominalppn']-$bartrx['nominalpph'],$eksi,$nocountertr,$noreff,$bartrx['muspk']);
							//rubah jadi tidak dikurangi nilai pph ==Jo 15-06-2017==
							postSpkBaKecil($bartrx['id'],$bartrx['pihak2'],$bartrx['nominaldpp']+$bartrx['nominalppn'],$eksi,$nocountertr,$noreff,$bartrx['muspk']);
						}
			}
			/* SPK Besar */
			if($_POST['tipe']==1) {
				$qinv = mysql_query("SELECT status FROM ".$dbname.".keu_trx_ht WHERE nodokumen='".$_POST['spk']."'");
				$cinv = mysql_fetch_object($qinv);

				$qdp = mysql_query("SELECT nilaidp FROM ".$dbname.".log_spkht_new WHERE nospk='".$_POST['spk']."'");
				$cdp = mysql_fetch_object($qdp);

				$sltrx="SELECT d.id, a.pihak2, d.nominaldpp, a.nospk, d.namaba, d.nominalppn, d.nominalpph, a.muspk, a.cip
						FROM ".$dbname.".log_spkht_new a
						INNER JOIN ".$dbname.".log_spk_ba d ON d.spk = a.nospk
						WHERE d.`id` = ".$_POST['id']." LIMIT 1";
						$restrx=$eksi->sSQL($sltrx);
						foreach($restrx as $bartrx){
							$noreff = $bartrx['nospk'].' | '.$bartrx['namaba'];
							//postSpkBaBesar($bartrx['id'],$bartrx['pihak2'],$bartrx['nominaldpp']+$bartrx['nominalppn']-$bartrx['nominalpph'],$eksi,$noreff,$bartrx['muspk'],$bartrx['nospk'],$bartrx['cip']);
							//rubah jadi tidak dikurangi nilai pph ==Jo 15-06-2017==
							postSpkBaBesar($bartrx['id'],$bartrx['pihak2'],$bartrx['nominaldpp']+$bartrx['nominalppn'],$eksi,$noreff,$bartrx['muspk'],$bartrx['nospk'],$bartrx['cip']);
						}
			}
		break;

		case 'loadDetailBAPosting':
			$limit=10;
			$page=0;
			if(isset($_POST['page'])){
			$page=$_POST['page'];
			if($page<0)
			$page=0;
			}
			$offset=$page*$limit;

			if($_POST['filter']!='' && $_POST['keyword']!='') {
				$filter = "WHERE ".$_POST['filter']." LIKE '%".$_POST['keyword']."%' AND spk = '".$_POST['spk']."'";
			}
			else {
				$filter = "WHERE spk = '".$_POST['spk']."'";
			}

			$str=" select a.dppba,a.id,b.nmkerja,a.spk,a.tipeba,a.namaba,a.persen,a.deskripsi,a.nominaldpp,
				   a.ppn,a.nominalppn,a.pph,a.nominalpph,a.totalba,a.nominaltotal,a.link1,posting,b.tipe,
			ifnull((SELECT x.deskripsi FROM log_master_pajak x WHERE x.kode=a.ppn LIMIT 1),' ')as namappn,
			ifnull((SELECT x.deskripsi FROM log_master_pajak x WHERE x.kode=a.pph LIMIT 1),' ')as namapph,
			ifnull((select sum(x.persen) FROM log_spk_ba x where x.spk=a.spk AND x.`id`<=a.`id` and x.posting=1),0) as progressBA  
				   from ".$dbname.".log_spk_ba a 
				   INNER JOIN ".$dbname.".log_spkht_new b ON a.spk = b.nospk ".$filter." 
				   order by a.id asc limit ".$offset.",".$limit." ";
			$sql=" select count(a.dppba) from ".$dbname.".log_spk_ba a INNER JOIN ".$dbname.".log_spkht_new b ON a.spk = b.nospk ".$filter." order by a.id asc";
			$res=mysql_query($str);
			$jlhbrs = 0;
			$no=($page*$limit);
			$query=mysql_query($sql) or die(mysql_error());
			while($jsl=mysql_fetch_object($query)){
				$jlhbrs= $jsl->jmlhrow;
			}
			while($bar=mysql_fetch_object($res)){
				$no+=1;
				if($bar->tipe==0){ $tipe = "Kecil";} else { $tipe = "Besar";}

				if($bar->link1==""){ $link = "";} else { $link="<a href='".$bar->link1."' target='_blank'><img src='images/zoom.png' title='Detail Link' class='resicon'></a>";}

				$strppn = "select rate from ".$dbname.".log_master_pajak where kode='".$bar->ppn."'";
				$resppn = mysql_query($strppn);
				$barppn = mysql_fetch_object($resppn);

				$strpph = "select rate from ".$dbname.".log_master_pajak where kode='".$bar->pph."'";
				$respph = mysql_query($strpph);
				$barpph = mysql_fetch_object($respph);

				if($bar->posting==0){
					$posting = "<img src=images/skyblue/posting.png class=resicon  title='".$_SESSION['lang']['belumposting']."' onclick=\"PostingBA('".$bar->id."','".$bar->spk."','".$bar->tipe."');\">";
				}
				else {
					$posting = "<img src=images/skyblue/posted.png class=resicon  title='".$_SESSION['lang']['post']."'>";
				}

				if($bar->namappn==' '){$namappn="0";} else {$namappn=$bar->namappn;}
				if($bar->namapph==' '){$namapph="0";} else {$namapph=$bar->namapph;}
				
				echo"<tr class=rowcontent>
					  <td>".$no."</td>
					  <td>".$bar->spk."</td>
					  <td>".$tipe."</td>
					  <td>".$bar->nmkerja."</td>
					  <td>".$bar->namaba."</td>
					  <td>".$bar->persen."%</td>
					  <td align=right>".number_format($bar->nominaldpp,2)."</td>
					  <td align=right>".$namappn."</td>
					  <td align=right>".$namapph."</td>
					  <td align=right>".number_format($bar->nominaltotal,2)."</td>
					  <td align=center>".$posting."</td>
					  <input type='hidden' id='url1_".$no."' value='".$bar->link1."'/>
					  </tr>";
			}
				echo "<tr class='footercolor'>
					<td colspan=16 align=center>
					".(($page*$limit)+1)." to ".(($page+1)*$limit)." Of ".  $jlhbrs."
					<br />
					<button class=mybutton onclick=cariBast123(".($page-1).");>".$_SESSION['lang']['pref']."</button>
					<button class=mybutton onclick=cariBast123(".($page+1).");>".$_SESSION['lang']['lanjut']."</button>
					</td>
					</tr>";
		break;

		case 'filtergrup':
			$strx="SELECT DISTINCT xx.notransaksi, xx.kegiatan FROM (SELECT DISTINCT notransaksi, concat(IFNULL(b.namakegiatan, a.kodekegiatan),' ', tanggalmulai) as kegiatan,
				a.kodekma, c.namabarang FROM ".$dbname.".vhc_trxomsh a
				LEFT JOIN ".$dbname.".vhc_kegiatanproyek b ON a.kodekegiatan = b.kodekegiatan
				AND b.tipekegiatan = a.jenistransaksi and a.tipetransaksi = '".$_POST['tipeop']."'
				LEFT JOIN ".$dbname.".organisasi x ON a.kodeorganisasi=x.kodeorganisasi AND b.kodeorganisasi=x.induk
				LEFT JOIN ".$dbname.".vhc_5master y on a.kodekma=y.kodevhc
				LEFT JOIN ".$dbname.".log_5masterbarang c on y.kodebarang=c.kodebarang
				WHERE a.statustrx = 1 and a.tipetransaksi = '".$_POST['tipeop']."' AND  a.jenistransaksi='".$_POST['oms']."' AND a.kodeorganisasi ='".$_SESSION['empl']['lokasitugas']."'
				UNION ALL
				select a.notransaksi,concat(b.namakegiatan,' ',a.tglmulai,' s/d ',a.tglselesai) as kegiatan,
				d.kodekma,t.namabarang
				from ".$dbname.".vhc_trxoperasionalh a
				inner join ".$dbname.".vhc_trxoperasionaldkma d on a.notransaksi=d.notransaksi
				LEFT JOIN ".$dbname.".vhc_5master u on u.kodevhc=d.kodekma
				LEFT JOIN ".$dbname.".log_5masterbarang t on t.kodebarang=u.kodebarang
				inner join ".$dbname.".organisasi c ON a.kodeorganisasi=c.kodeorganisasi
				inner join ".$dbname.".vhc_kegiatanproyek b on b.tipekegiatan='".$_POST['oms']."'
				AND a.kodekegiatan=b.kodekegiatan AND b.kodeorganisasi=c.induk
				WHERE a.statustrx = 1 and a.tipetransaksi = '".$_POST['tipeop']."' AND a.kodeorganisasi ='".$_SESSION['empl']['lokasitugas']."' AND  a.jenistransaksi='".$_POST['oms']."') as xx";
				$resx=mysql_query($strx);
				echo "<select id='traksi' onchange='filterTraksi()'>";
				echo "<option value=''>".$_SESSION['lang']['pilih']."</option>";
				while($barx=mysql_fetch_object($resx)){
					echo "<option value='".$barx->notransaksi."'>".$barx->notransaksi." - ".$barx->kegiatan."</option>";
				}
				echo "</select>";
		break;

		case 'filtertraksi':
			$strx="SELECT DISTINCT notransaksi, concat(IFNULL(b.namakegiatan, a.kodekegiatan),' ', tanggalmulai) as kegiatan,
				a.kodekma, c.namabarang FROM ".$dbname.".vhc_trxomsh a
				LEFT JOIN ".$dbname.".vhc_kegiatanproyek b ON a.kodekegiatan = b.kodekegiatan
				AND b.tipekegiatan = a.jenistransaksi and a.tipetransaksi = '".$_POST['tipeop']."'
				LEFT JOIN ".$dbname.".organisasi x ON a.kodeorganisasi=x.kodeorganisasi AND b.kodeorganisasi=x.induk
				LEFT JOIN ".$dbname.".vhc_5master y on a.kodekma=y.kodevhc
				LEFT JOIN ".$dbname.".log_5masterbarang c on y.kodebarang=c.kodebarang
				WHERE a.statustrx = 1 and a.tipetransaksi = '".$_POST['tipeop']."' AND  a.jenistransaksi='".$_POST['oms']."' AND a.notransaksi='".$_POST['traksi']."' AND a.kodeorganisasi ='".$_SESSION['empl']['lokasitugas']."'
				UNION ALL
				select a.notransaksi,concat(b.namakegiatan,' ',a.tglmulai,' s/d ',a.tglselesai) as kegiatan,
				d.kodekma,t.namabarang
				from ".$dbname.".vhc_trxoperasionalh a
				inner join ".$dbname.".vhc_trxoperasionaldkma d on a.notransaksi=d.notransaksi
				LEFT JOIN ".$dbname.".vhc_5master u on u.kodevhc=d.kodekma
				LEFT JOIN ".$dbname.".log_5masterbarang t on t.kodebarang=u.kodebarang
				inner join ".$dbname.".organisasi c ON a.kodeorganisasi=c.kodeorganisasi
				inner join ".$dbname.".vhc_kegiatanproyek b on b.tipekegiatan='".$_POST['oms']."'
				AND a.kodekegiatan=b.kodekegiatan AND b.kodeorganisasi=c.induk
				WHERE a.statustrx = 1 and a.tipetransaksi = '".$_POST['tipeop']."' AND a.jenistransaksi='".$_POST['oms']."' AND a.notransaksi='".$_POST['traksi']."' AND a.kodeorganisasi ='".$_SESSION['empl']['lokasitugas']."'";
				$resx=mysql_query($strx);
				echo "<select id='traksi' onchange='filterTraksi()'>";
				echo "<option value=''>".$_SESSION['lang']['pilih']."</option>";
				while($barx=mysql_fetch_object($resx)){
					echo "<option value='".$barx->kodekma."'>".$barx->kodekma." - ".$barx->namabarang."</option>";
				}
				echo "</select>";
		break;

		case 'filterkma':
			$strx="SELECT DISTINCT xx.kodekma, xx.namabarang FROM (SELECT DISTINCT notransaksi, concat(IFNULL(b.namakegiatan, a.kodekegiatan),' ', tanggalmulai) as kegiatan,
				a.kodekma, c.namabarang FROM ".$dbname.".vhc_trxomsh a
				LEFT JOIN ".$dbname.".vhc_kegiatanproyek b ON a.kodekegiatan = b.kodekegiatan
				AND b.tipekegiatan = a.jenistransaksi and a.tipetransaksi = '".$_POST['tipeop']."'
				LEFT JOIN ".$dbname.".organisasi x ON a.kodeorganisasi=x.kodeorganisasi AND b.kodeorganisasi=x.induk
				LEFT JOIN ".$dbname.".vhc_5master y on a.kodekma=y.kodevhc
				LEFT JOIN ".$dbname.".log_5masterbarang c on y.kodebarang=c.kodebarang
				WHERE a.statustrx = 1 and a.tipetransaksi = '".$_POST['tipeop']."' AND  a.jenistransaksi='".$_POST['oms']."'  AND a.kodeorganisasi ='".$_SESSION['empl']['lokasitugas']."'
				UNION ALL
				select a.notransaksi,concat(b.namakegiatan,' ',a.tglmulai,' s/d ',a.tglselesai) as kegiatan,
				d.kodekma,t.namabarang
				from ".$dbname.".vhc_trxoperasionalh a
				inner join ".$dbname.".vhc_trxoperasionaldkma d on a.notransaksi=d.notransaksi
				LEFT JOIN ".$dbname.".vhc_5master u on u.kodevhc=d.kodekma
				LEFT JOIN ".$dbname.".log_5masterbarang t on t.kodebarang=u.kodebarang
				inner join ".$dbname.".organisasi c ON a.kodeorganisasi=c.kodeorganisasi
				inner join ".$dbname.".vhc_kegiatanproyek b on b.tipekegiatan='".$_POST['oms']."'
				AND a.kodekegiatan=b.kodekegiatan AND b.kodeorganisasi=c.induk
				WHERE a.statustrx = 1 and a.tipetransaksi = '".$_POST['tipeop']."'  AND a.kodeorganisasi ='".$_SESSION['empl']['lokasitugas']."' AND  a.jenistransaksi='".$_POST['oms']."') AS xx";
				//echo "Warning ". $strx;
				$resx=mysql_query($strx);
				$hasil = "<select id='kma' onchange='filterKma()'>";
				$hasil .= "<option value=''>".$_SESSION['lang']['pilih']."</option>";
				while($barx=mysql_fetch_object($resx)){
					$hasil .= "<option value='".$barx->kodekma."'>".$barx->kodekma." - ".$barx->namabarang."</option>";
				}
				$hasil .= "</select>";
				echo $hasil;
		break;

		case 'filterxxx':
			$strx="SELECT DISTINCT notransaksi, concat(IFNULL(b.namakegiatan, a.kodekegiatan),' ', tanggalmulai) as kegiatan FROM ".$dbname.".vhc_trxomsh a
				LEFT JOIN ".$dbname.".vhc_kegiatanproyek b ON a.kodekegiatan = b.kodekegiatan
				AND b.tipekegiatan = a.jenistransaksi and a.tipetransaksi = '".$_POST['tipeop']."'
				LEFT JOIN ".$dbname.".organisasi x ON a.kodeorganisasi=x.kodeorganisasi AND b.kodeorganisasi=x.induk
				LEFT JOIN ".$dbname.".vhc_5master y on a.kodekma=y.kodevhc
				LEFT JOIN ".$dbname.".log_5masterbarang c on y.kodebarang=c.kodebarang
				WHERE a.statustrx = 1 AND a.kodeorganisasi ='".$_SESSION['empl']['lokasitugas']."' and a.tipetransaksi = '".$_POST['tipeop']."' AND  a.jenistransaksi='".$_POST['oms']."'";
				if(trim($_POST['kma'])!=""){
					$strx.=" AND a.kodekma='".$_POST['kma']."'";
				}				
			$strx.=" UNION ALL
				select a.notransaksi,concat(b.namakegiatan,' ',a.tglmulai,' s/d ',a.tglselesai) as kegiatan
				from ".$dbname.".vhc_trxoperasionalh a
				inner join ".$dbname.".vhc_trxoperasionaldkma d on a.notransaksi=d.notransaksi
				LEFT JOIN ".$dbname.".vhc_5master u on u.kodevhc=d.kodekma
				LEFT JOIN ".$dbname.".log_5masterbarang t on t.kodebarang=u.kodebarang
				inner join ".$dbname.".organisasi c ON a.kodeorganisasi=c.kodeorganisasi
				inner join ".$dbname.".vhc_kegiatanproyek b on b.tipekegiatan='".$_POST['oms']."'
				AND a.kodekegiatan=b.kodekegiatan AND b.kodeorganisasi=c.induk
				WHERE a.statustrx = 1 AND a.kodeorganisasi ='".$_SESSION['empl']['lokasitugas']."' and a.tipetransaksi = '".$_POST['tipeop']."' AND a.jenistransaksi='".$_POST['oms']."'";
				if(trim($_POST['kma'])!=""){
				$strx.=" AND d.kodekma='".$_POST['kma']."'";
				}
				//echo "Warning passing :".$_POST['kma'];
				$resx=mysql_query($strx);
				echo "<select id='traksi' onchange='filterTraksi()'>";
				echo "<option value=''>".$_SESSION['lang']['pilih']."</option>";
				while($barx=mysql_fetch_object($resx)){
					echo "<option value='".$barx->notransaksi."'>".$barx->notransaksi." - ".$barx->kegiatan."</option>";
				}
				echo "</select>";
		break;

		case 'filteromas' :
			if($_POST['tipeop']=='MS') {
				#BatuBara
				$jenis1=$eksi->ssql("SELECT kode,nama FROM ".$dbname.".setup_5parameter WHERE flag='jnstraksi2'");
				$optjenis1="";
				foreach($jenis1 as $row){
					$optjenis1.="<option value='".$row['kode']."'>".$row['nama']."</option>";
				}
				echo $optjenis1;
			}
			else {
				#Pembangkit
				$jenis1=$eksi->ssql("SELECT kode,nama FROM ".$dbname.".setup_5parameter WHERE flag='jnstraksi4'");
				$optjenis1="";
				foreach($jenis1 as $row){
					$optjenis1.="<option value='".$row['kode']."'>".$row['nama']."</option>";
				}
				echo $optjenis1;
			}
		break;

		default:
        break;
}

function postSpkBaBesar($idba,$custid,$grandtotal,$eksi,$noreferensi,$muspk,$spks,$nocip){
	$slsp="select kodekelompok from log_5supplier where supplierid='".$custid."'";
	$ressp=$eksi->sSQL($slsp);
	$kodeklp="";
	foreach($ressp as $barsp){
		$kodeklp=$barsp['kodekelompok'];
	}

	$advance="";
	$ap="";
	$apreal="";
	$slspl="select advance,noakun,apaccrued from log_5klsupplier where kode='".$kodeklp."'";
	$resspl=$eksi->sSQL($slspl);
	foreach($resspl as $barspl){
		$advance=$barspl['advance'];
		$ap=$barspl['apaccrued'];
		$apreal=$barspl['noakun'];
	}

	$pesan="";
	if($kodeklp==""){
		$pesan=" Warning : Supplier / Customer Group should be setting first.";
	}

	if($advance==""){
		$pesan=" Warning : Advance Account Number at Supplier / Customer Group should be setting first.";
	}

	if($ap==""){
		$pesan=" Warning : Account Payable Accrued Number at Supplier / Customer Group should be setting first.";
	}

	if($apreal==""){
		$pesan=" Warning : Account Payable Number at Supplier / Customer Group should be setting first.";
	}

	if ($pesan!=""){
		echo $pesan;
		exit;
	}

//	$ssql="SELECT b.cip,c.noakun,c.kodetipe,a.id,a.spk FROM log_spk_ba a,log_spkht_new b,
//	log_cipht c WHERE a.tipeba=1 AND a.tipeba=b.tipe AND a.spk=b.nospk AND c.nocip=b.cip AND a.id='".$idba."' ORDER BY a.id DESC LIMIT 1";

	$ssql="SELECT b.cip,c.noakun,c.kodetipe,a.id,a.spk
	FROM log_spk_ba a,log_spkht_new b, log_cipht c
	WHERE a.spk=b.nospk AND c.nocip=b.cip AND a.id='".$idba."' ORDER BY a.id DESC LIMIT 1";

	$data=$eksi->sSQL($ssql);
	foreach($data as $row1){
		$cipacc=$row1['noakun'];
	}

	$debet=array();
	$ndebet=array();
	$kredit=array();
	$nkredit=array();

	/*adakah DP sebelum BA?*/

	$dp    = 0;
	//rubah jadi +ppn ==Jo 15-05-2017== SAS 2017-06-07 dikali dengan kurs
	$strdp = "SELECT sum((a.nett+a.nilaippn)*a.kursbayar) as dpx	FROM keu_trx_ht a
			WHERE a.nodokumen = '".$spks."'  AND a.`status` = 3";
	$resdp = $eksi->sSQL($strdp);
	foreach($resdp as $bar){
		$dp = $bar['dpx'];
	}

	$ba = 0;
	$strinv = "select sum(a.nominaltotal) as ba from log_spk_ba a
				WHERE a.posting=1 AND a.spk='".$spks."'";

	$resinv = $eksi->sSQL($strinv);
	foreach($resinv as $bar){
		$ba = $bar['ba'];
	}

	$dp=$dp-$ba;

	//echo " warning :Nilai DP :".$dp." Nilai BA sebelumnya :".$ba."";
	//exit;
	/*normal tanpa DP*/
	if ($dp<=0){
		$debet[0]=$cipacc;
		$kredit[0]=$ap;
		$ndebet[0]=$grandtotal;
		$nkredit[0]=$grandtotal;
	}

	/*Jika ada DP< Invoice Baru*/
	if ($dp<$grandtotal && $dp>0){
		$debet[0]=$cipacc;
		$kredit[0]=$advance;
		$kredit[1]=$ap;

		$ndebet[0]=$grandtotal;
		$nkredit[0]=$dp;
		$nkredit[1]=$grandtotal-$dp;

	}

	/*jika ada DP > dari invoice baru*/
	if ($dp>=$grandtotal && $dp>0){
		$debet[0]=$cipacc;
		$kredit[0]=$advance;

		$ndebet[0]=$grandtotal;
		$nkredit[0]=$grandtotal;
	}

	//echo"Warning:\n Debet :".$ndebet[0]."\n Kredit 1:".$nkredit[0]." Kredit 2:".$nkredit[1];
	//return;

	insertCip($eksi,$nocip,$grandtotal,$spks,$idba);

	//kode,nocounter jurnal
	$kodejurnal='';
	$slkdjr="SELECT prefix,nokounter FROM keu_5strx
			WHERE kodeinduk='".$_SESSION['lang']['defaultrxba']."'
			AND kode='".$_SESSION['lang']['defaultstrxba']."'
			LIMIT 1";
	//echo "Warning ". $slkdjr;
	$reskdjr=$eksi->sSQL($slkdjr);
	foreach($reskdjr as $barkdjr){
		$kodejurnal=$barkdjr['prefix'];
		$counters=$barkdjr['nokounter'];
	}

	$nocounter=intval($counters)+1;
	$nocounters=substr("000".$nocounter,strlen("000".$nocounter)-3,3);

	$nojurnal=str_replace("-","",date('Y-m-d'))."/".$_SESSION['empl']['lokasitugas']."/".$kodejurnal."/".$nocounters;
	//posting ke jurnal
	//header jurnal
	$header=array("nojurnal"=>"'".$nojurnal."'",
				  "kodejurnal"=>"'".$kodejurnal."'",
				  "tanggal"=>"'".date('Y-m-d')."'",
				  "tanggalentry"=>"'".date('Y-m-d')."'",
				  "posting"=>"0",
				  "totaldebet"=>"".$grandtotal."",
				  "totalkredit"=>"".-1*$grandtotal."",
				  "amountkoreksi"=>"0",
				  "noreferensi"=>"'".$noreferensi."'",
				  "autojurnal"=>"1",
				  "matauang"=>"'".$muspk."'",
				  "kurs"=>"1",
				  "revisi"=>"0");

	$stringhd1=$eksi->genSQL('keu_jurnalht_temp',$header,false);
	$eksi->exc($stringhd1);
	$eksi->hapus('keu_jurnalht'," Where nojurnal='".$nojurnal."'");
	$stringhd=$eksi->genSQL('keu_jurnalht',$header,false);

	$postHeader=$eksi->exc($stringhd);
	$cek = $eksi->sSQL("SELECT nojurnal FROM keu_jurnalht WHERE nojurnal='".$nojurnal."' LIMIT 1");
	$cekdata = "";
	foreach($cek as $row1){
		$cekdata = $row1['nojurnal'];
	}
	//print_r($stringhd);
	//$eksi->hapus("keu_jurnalht", " where nojurnal='".$nojurnal."'");
	//$eksi->hapus("keu_jurnaldt", " where nojurnal='".$nojurnal."'");
	if($postHeader){
		//detail jurnal (debet dan kredit)
		//debet
		//echo "warning:Halooo";
		$nourut=1;
		for($i=0;$i<count($debet);$i++){
			$insdebet=array("nojurnal"=>"'".$nojurnal."'",
				  "tanggal"=>"'".date('Ymd')."'",
				  "nourut"=>"".$nourut."",
				  "noakun"=>"'".$debet[$i]."'",
				  "keterangan"=>"''",
				  "jumlah"=>"".$ndebet[$i]."",
				  "matauang"=>"'".$muspk."'",
				  "kurs"=>"1",
				  "kodeorg"=>"'".$_SESSION['empl']['lokasitugas']."'",
				  "kodekegiatan"=>"''",
				  "kodeasset"=>"''",
				  "kodebarang"=>"''",
				  "nik"=>"'".$_SESSION['standard']['userid']."'",
				  "kodecustomer"=>"'".$custid."'",
				  "kodesupplier"=>"'".$custid."'",
				  "noreferensi"=>"'".$noreferensi."'",
				  "noaruskas"=>"''",
				  "kodevhc"=>"''",
				  "nodok"=>"'".$idba."'",
				  "kodeblok"=>"''",
				  "revisi"=>"0");
			$stringdebet=$eksi->genSQL('keu_jurnaldt',$insdebet,false);
			//echo "warning: ".$stringdebet;
			$qdebet=$eksi->exc($stringdebet);
			if($qdebet){
				$nourut++;
			}
		}
		//kredit
		for($i=0;$i<count($kredit);$i++){
			$inskredit=array("nojurnal"=>"'".$nojurnal."'",
				  "tanggal"=>"'".date('Ymd')."'",
				  "nourut"=>"".$nourut."",
				  "noakun"=>"'".$kredit[$i]."'",
				  "keterangan"=>"''",
				  "jumlah"=>"".-1*$nkredit[$i]."",
				  "matauang"=>"'".$muspk."'",
				  "kurs"=>"1",
				  "kodeorg"=>"'".$_SESSION['empl']['lokasitugas']."'",
				  "kodekegiatan"=>"''",
				  "kodeasset"=>"''",
				  "kodebarang"=>"''",
				  "nik"=>"'".$_SESSION['standard']['userid']."'",
				  "kodecustomer"=>"'".$custid."'",
				  "kodesupplier"=>"'".$custid."'",
				  "noreferensi"=>"'".$noreferensi."'",
				  "noaruskas"=>"''",
				  "kodevhc"=>"''",
				  "nodok"=>"'".$idba."'",
				  "kodeblok"=>"''",
				  "revisi"=>"0");
			$stringkredit=$eksi->genSQL('keu_jurnaldt',$inskredit,false);
			//echo "Warning : ". $stringkredit;
			$qkredit=$eksi->exc($stringkredit);
			if($qkredit){
				$nourut++;
				if($i==count($kredit)-1){
					$updates=array("posting"=>"1","postingby" =>"'".$_SESSION['standard']['userid']."'");
					$string=$eksi->genSQL('log_spk_ba',$updates,true)." WHERE  id='".$idba."'";
					$hasil=$eksi->exc($string);
					if(!$hasil){
						echo $_SESSION['lang']['simpangagal'];
					}
					else {
						$upcounter=array("nokounter"=>"".$nocounters."");
						$stcounter=$eksi->genSQL('keu_5strx',$upcounter,true)." where kodeinduk='".$_SESSION['lang']['defaultrxba']."' AND kode='".$_SESSION['lang']['defaultstrxba']."'";
						$hasilct=$eksi->exc($stcounter);
						if($hasilct){
							echo $_SESSION['lang']['dataposted'];
						}
						else {
							echo $_SESSION['lang']['simpangagal'];
						}
					}
				}
			}
		}
	}
	else {
		echo $_SESSION['lang']['simpangagal'];
	}
}

function insertCip($eksi,$nocip,$grandtotal,$spk,$idba){
$slasset="select ifnull(a.isPosting,0)as isPosting,b.akunak as cipacc, a.noakun as akunbiaya
from log_cipht a left join sdm_5tipeasset b on a.kodetipe=b.kodetipe
where a.nocip='".$nocip."' limit 1";
$resasset=$eksi->sSQL($slasset);
foreach($resasset as $barasset){
	$cipacc		= $barasset['cipacc'];
	$cipacby	= $barasset['akunbiaya'];
}

$ketcip= "";
$strKetSPK = "select nmkerja from log_spkht_new where nospk='".$spk."'";
$resKetSPK= $eksi->sSQL($strKetSPK);
foreach($resKetSPK as $barKetSPK){
	$barKetSPK=$barKetSPK['nmkerja'];
}
$nominaldpp=0;
$strKetBA = "select distinct deskripsi,nominaldpp,nominalppn from log_spk_ba where id='".$idba."'";
$resKetBA= $eksi->sSQL($strKetBA);
foreach($resKetBA as $barKetBAx){
	$barKetBA=$barKetBAx['deskripsi'];
	//$nominaldpp=$barKetBAx['nominaldpp'];
	//rubah jadi +ppn ==Jo 15-05-2017==
	$nominaldpp=$barKetBAx['nominaldpp']+$barKetBAx['nominalppn'];
}

$ketcip .= "Nama Pekerjaan SPK : ".$barKetSPK.", Deskripsi BA SPK : ".$barKetBA."";
$hargasatuancip=$nominaldpp;
$slbarang  = "select kodebarang from log_5masterbarang where itemNonPo=1 limit 1";
$resbarang = $eksi->sSQL($slbarang);
$sumbarang = $eksi->sSQLnum($slbarang);

foreach($resbarang as $barbarang){
	$strinsertcipdt=array(
		"nocip"		 =>"'".$nocip."'",
		"kodebarang" =>"'".$barbarang['kodebarang']."'",
		"jumlah"	 =>"1",
		"hargasatuan"=>"'".$hargasatuancip."'",
		"keterangan" =>"'".$ketcip."'",
		"docno"		 =>"'".$idba."'",
		"create_by"	 =>"'".$_SESSION['empl']['karyawanid']."'",
		"create_date"=>"'".date('Y-m-d')."'",
		"isgrn"		 =>"1");

	$stringcipdt=$eksi->genSQL('log_cipdt',$strinsertcipdt,false);
	//exit($stringcipdt);
	$eksi->lock('log_cipdt');
	$eksi->exc($stringcipdt);
	$eksi->unlock();

	$ssql="SELECT `id` as urut FROM log_cipdt WHERE nocip='".$nocip."' AND kodebarang='".$barbarang['kodebarang']."' AND docno='".$idba."' ORDER BY urut DESC LIMIT 1";
	$rxc=$eksi->sSQL($ssql);
	$cipdtid=0;
	foreach($rxc as $r1)
	{
		$cipdtid=$r1['urut'];
	}


	$inscipjn=array(
	  "nocip"		=> "'".$nocip."'",
	  "kodebarang"	=> "'".$barbarang['kodebarang']."'",
	  "noakunasset"	=> "'".$cipacc."'",
	  "noakunbiaya"	=> "''",
	  "jumlah"		=> "1",
	  "subtotal"	=> "".$hargasatuancip."",
	  "hargasatuan"	=> "".$hargasatuancip."",
	  "keterangan"	=> "'".$ketcip."'",
	  "idBA"		=> "".$idba."",
	  "cipdtid"		=>"".$cipdtid."",
	  "create_by"	=> "'".$_SESSION['standard']['userid']."'");

	$eksi->lock('log_cipdt_for_jurnal');
	$eksi->hapus("log_cipdt_for_jurnal", " where nocip=".$nocip." and kodebarang=".$barbarang['kodebarang']." AND idBA=".$idba);
	$stringcipjrdt=$eksi->genSQL('log_cipdt_for_jurnal',$inscipjn,false);
	//exit($stringcipjrdt);
	$eksi->exc($stringcipjrdt);
	$eksi->unlock();
}
}

function postSpkBaKecil($idba,$custid,$grandtotal,$eksi,$nocountertr,$noreferensi,$muspk){
	$ssql="SELECT a.nospk,a.tipe,e.namaba,a.act,d.namakegiatan,d.noakun as akunbiaya,
		   b.apaccrued as apaccrued, e.nominaltotal,e.spk,b.advance
		   FROM log_spkht_new a,log_5klsupplier b,log_5supplier c,
		   setup_kegiatan d, log_spk_ba e
		   WHERE a.pihak2=c.supplierid AND b.kode=c.kodekelompok
		   AND a.act=d.kodekegiatan AND e.spk=a.nospk
		   AND e.id='".$idba."' ORDER BY e.id DESC LIMIT 1";
	$data=$eksi->sSQL($ssql);
	$spks="";
	$advance="";
	foreach($data as $row1){
		$wip=$row1['akunbiaya'];
		$ap=$row1['apaccrued'];
		$spks=$row1['spk'];
		$advance=$row1['advance'];
	}

	/*cek ada DP tidak?*/

	$dp    = 0;
	/*$strdp = "SELECT sum(a.nett) as dpx	FROM keu_trx_ht a
			  WHERE a.nodokumen = '".$spks."'  AND a.`status` = 3";*/
	$strdp = "SELECT sum(a.nett+a.nilaippn) as dpx	FROM keu_trx_ht a
			  WHERE a.nodokumen = '".$spks."'  AND a.`status` = 3";
	$resdp = $eksi->sSQL($strdp);
	foreach($resdp as $bar){
		$dp = $bar['dpx'];
	}

	$ba = 0;
	$strinv = "select ifnull(sum(a.nominaldpp),0) as ba from log_spk_ba a
	INNER JOIN log_spkht_new b on a.spk = b.nospk
	WHERE a.posting=1 AND a.spk='".$spks."' AND b.tipe=0";
	$resinv = $eksi->sSQL($strinv);
	foreach($resinv as $bar){
		$ba = $bar['ba'];
	}

	$dp=$dp-$ba;


	$debet=array();
	$ndebet=array();
	$kredit=array();
	$nkredit=array();

	/*normal tanpa DP*/
	if ($dp<=0){
		$debet[0]=$wip;
		$kredit[0]=$ap;

		$ndebet[0]=$grandtotal;
		$nkredit[0]=$grandtotal;
	}

	/*Jika ada DP< Invoice Baru*/
	if ($dp<$grandtotal && $dp>0){
		$debet[0]=$wip;
		$kredit[0]=$advance;
		$kredit[1]=$ap;

		$ndebet[0]=$grandtotal;
		$nkredit[0]=$dp;
		$nkredit[1]=$grandtotal-$dp;

	}

	/*jika ada DP > dari invoice baru*/
	if ($dp>=$grandtotal && $dp>0){
		$debet[0]=$wip;
		$kredit[0]=$advance;

		$ndebet[0]=$grandtotal;
		$nkredit[0]=$grandtotal;
	}

	/*
	$debet[0]=$wip;
	$kredit[0]=$ap;
	$ndebet[0]=$grandtotal;
	$nkredit[0]=$grandtotal;
	*/
	//kode,nocounter jurnal
	$kodejurnal='';
	$slkdjr="select prefix,nokounter from keu_5strx where kode='21201'";
	$reskdjr=$eksi->sSQL($slkdjr);
	foreach($reskdjr as $barkdjr){
		$kodejurnal=$barkdjr['prefix'];
		$counters=$barkdjr['nokounter'];
	}

	$nocounter=intval($counters)+1;
	$nocounters=substr("0000".$nocounter,strlen("0000".$nocounter)-3,4);


	$nojurnal=str_replace("-","",date('Y-m-d'))."/".$_SESSION['empl']['lokasitugas']."/".$kodejurnal."/".$nocounters;
	//posting ke jurnal
	//header jurnal
	$header=array("nojurnal"=>"'".$nojurnal."'",
				  "kodejurnal"=>"'".$kodejurnal."'",
				  "tanggal"=>"'".date('Ymd')."'",
				  "tanggalentry"=>"'".date('Ymd')."'",
				  "posting"=>"0",
				  "totaldebet"=>"".$grandtotal."",
				  "totalkredit"=>"".-1*$grandtotal."",
				  "amountkoreksi"=>"0",
				  "noreferensi"=>"'".$noreferensi."'",
				  "autojurnal"=>"1",
				  "matauang"=>"'".$muspk."'",
				  "kurs"=>"1",
				  "revisi"=>"0");

	$stringhd=$eksi->genSQL('keu_jurnalht_temp',$header,false).";";
	$eksi->exc($stringhd);
	$stringhd=$eksi->genSQL('keu_jurnalht',$header,false).";";
	//echo "warning: ".$stringhd;
	$postHeader=$eksi->exc($stringhd);

	$eksi->hapus("keu_jurnaldt", " where nojurnal='".$nojurnal."'");
	if($postHeader){
		//detail jurnal (debet dan kredit)
		//debet
		$nourut=1;
		for($i=0;$i<count($debet);$i++){
			$insdebet=array("nojurnal"=>"'".$nojurnal."'",
				  "tanggal"=>"'".date('Ymd')."'",
				  "nourut"=>"".$nourut."",
				  "noakun"=>"'".$debet[$i]."'",
				  "keterangan"=>"''",
				  "jumlah"=>"".$ndebet[$i]."",
				  "matauang"=>"'".$muspk."'",
				  "kurs"=>"1",
				  "kodeorg"=>"'".$_SESSION['empl']['lokasitugas']."'",
				  "kodekegiatan"=>"''",
				  "kodeasset"=>"''",
				  "kodebarang"=>"''",
				  "nik"=>"'".$_SESSION['standard']['userid']."'",
				  "kodecustomer"=>"'".$custid."'",
				  "kodesupplier"=>"'".$custid."'",
				  "noreferensi"=>"'".$noreferensi."'",
				  "noaruskas"=>"''",
				  "kodevhc"=>"''",
				  "nodok"=>"'".$idba."'",
				  "kodeblok"=>"''",
				  "revisi"=>"0");
			$stringdebet=$eksi->genSQL('keu_jurnaldt',$insdebet,false);
			//echo "warning: ".$stringdebet;
			$qdebet=$eksi->exc($stringdebet);
			if($qdebet){
				$nourut++;
			}
		}
		//kredit
		for($i=0;$i<count($kredit);$i++){
			$inskredit=array("nojurnal"=>"'".$nojurnal."'",
				  "tanggal"=>"'".date('Ymd')."'",
				  "nourut"=>"".$nourut."",
				  "noakun"=>"'".$kredit[$i]."'",
				  "keterangan"=>"''",
				  "jumlah"=>"".-1*$nkredit[$i]."",
				  "matauang"=>"'".$muspk."'",
				  "kurs"=>"1",
				  "kodeorg"=>"'".$_SESSION['empl']['lokasitugas']."'",
				  "kodekegiatan"=>"''",
				  "kodeasset"=>"''",
				  "kodebarang"=>"''",
				  "nik"=>"'".$_SESSION['standard']['userid']."'",
				  "kodecustomer"=>"'".$custid."'",
				  "kodesupplier"=>"'".$custid."'",
				  "noreferensi"=>"'".$noreferensi."'",
				  "noaruskas"=>"''",
				  "kodevhc"=>"''",
				  "nodok"=>"'".$idba."'",
				  "kodeblok"=>"''",
				  "revisi"=>"0");
			$stringkredit=$eksi->genSQL('keu_jurnaldt',$inskredit,false);
			//echo "Warning : ". $stringkredit;
			$qkredit=$eksi->exc($stringkredit);
			if($qkredit){
				$nourut++;
				if($i==count($kredit)-1){
					$updates=array("posting"=>"1","postingby" =>"'".$_SESSION['standard']['userid']."'");
					$string=$eksi->genSQL('log_spk_ba',$updates,true)." WHERE  id='".$idba."'";
					$hasil=$eksi->exc($string);
					if(!$hasil){
						echo $_SESSION['lang']['simpangagal'];
					}
					else {
						$upcounter=array("nokounter"=>"".$nocounters."");
						$stcounter=$eksi->genSQL('keu_5strx',$upcounter,true)." WHERE prefix='".$kodejurnal."'";
						//echo "warning: ".$stcounter;
						$hasilct=$eksi->exc($stcounter);
						if($hasilct){
							echo $_SESSION['lang']['dataposted'];
						}
						else {
							echo $_SESSION['lang']['simpangagal'];
						}
					}
				}
			}
		}
	}
	else {
		echo $_SESSION['lang']['simpangagal'];
	}
}
?>
