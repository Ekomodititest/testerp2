<?php
session_start();
include_once('lib/nangkoelib.php');
include_once('lib/zLib.php');
$prosesz = $_GET['prosesz'];
$param = $_POST;
$createby=$_SESSION['standard']['userid'];
if($_POST['proses']=='createTable') {
    # Get Data
    $query = selectQuery($dbname,'log_prapodt',"*","`nopp`='".$_POST['id']."'"); 
    $data = fetchData($query);
	#exit("error: ".print_r($data));
    # Create Detail Table
    createTabDetail($_POST['id'],$data);
} else {
		$data   = $_POST;
        $tglsdt = tanggalsystem($data['tgl_sdt']);
        $rtglpp = tanggalsystem($data['rtgl_pp']);
    unset($data['proses']);
    switch($_POST['proses']) {
        case 'detail_add' :
            # Check Valid Data
                        $starttime = strtotime($data['rtgl_pp']);//time();// tanggal sekarang
                        $endtime   = strtotime($data['tgl_sdt']);//tanggal pembuatan dokumen
                        $timediff  = $endtime-$starttime;
                        $days	   = intval($timediff/86400);
                        //echo "Warning :".$days;//exit();
                        //echo "warning:".$data['kd_brg']."--".$data['kd_angrn']."--".$data['jmlhDiminta']."--".$data['tgl_sdt']."--".$data['rtgl_pp'];exit();
            $dquery="select * from ".$dbname.".log_prapodt where `nopp`='".$data['kode']."' AND kodebarang ='".$data['kd_brg']."'";
            $dqry=mysql_query($dquery) or die(mysql_error());
            $dres=mysql_fetch_assoc($dqry);
						
			if(($data['kd_brg']=='')) {
				echo "Warning : Kode barang tidak boleh kosong";
				exit;
			}			
			if($data['jmlhDiminta']=='') {
				echo "Warning : Mohon isi jumlah yang diminta";
				exit;
			}			
            if(($tglsdt<$rtglpp) or $days<7) {
                echo "Warning : ".$_SESSION['lang']['pp7hari'];
                exit;
            } 		
			
            if(($data['kd_brg']== $dres['kodebarang']) and ($data['kode']== $dres['nopp'])) {
                echo "Warning : Kode barang tidak boleh sama !";			
                exit;
            } 			
			
            $ql="select * from ".$dbname.".log_prapoht where `nopp`='".$data['kode']."'" ;
            $qry=mysql_query($ql) or die(mysql_error());
            $res=mysql_fetch_assoc($qry);
            if($res['nopp']!=''){
                # Make Query
                $data['tgl_sdt']=tanggalsystem($data['tgl_sdt']);
                /* $colomn=array('nopp','kodebarang','kd_anggran','jumlah','tgl_sdt','keterangan');
                $query = insertQuery($dbname,'log_prapodt',$data,$colomn); */
                #$query="insert into ".$dbname.".log_prapodt (`nopp`,`kodebarang`,`kd_anggran`,`jumlah`,`tgl_sdt`,`keterangan`,`nocip`) values ('".$data['kode']."','".$data['kd_brg']."','".$data['kd_angrn']."','".$data['jmlhDiminta']."','".$data['tgl_sdt']."','".$data['ket']."','".$data['nocip']."')";
				$query="insert into ".$dbname.".log_prapodt (`nopp`,`kodebarang`,`kd_anggran`,`jumlah`,`tgl_sdt`,`keterangan`,`nocip`) values ('".$data['kode']."','".$data['kd_brg']."','','".$data['jmlhDiminta']."','".$data['tgl_sdt']."','".$data['ket']."','".$data['nocip']."')";				
                # Insert Data
                if(!mysql_query($query)) {
                    echo "DB Error 1 : ".mysql_error($conn);
                }
				else{
						$sCIP="insert into ".$dbname.".log_cipdt(`nocip`, `kodebarang`, `nopp`, `jumlah`,`keterangan`,`create_by`)
						    	values('".$data['nocip']."','".$data['kd_brg']."','".$data['kode']."','".$data['jmlhDiminta']."','".$data['ket']."','".$createby."')";
						if(!mysql_query($sCIP))
						{
							//echo $sCIP; 
							echo "Gagal,".(mysql_error($conn));exit();
						}
					}
                                //echo $query; exit();
            }
            else
            {	
                $nopp=$data['kode'];
                $tgl=tanggalsystem($data['rtgl_pp']);
                $kodeorg=$data['rkd_bag'];
                $id_user=$_POST['user_id'];
                //if($_SESSION['empl']['tipeinduk']=='HOLDING')
//				{
//				$sorg="select alokasi from ".$dbname.".organisasi where kodeorganisasi='".$kodeorg."'";
//				}
//				else
//				{
//				$sorg="select induk from ".$dbname.".organisasi where kodeorganisasi='".$kodeorg."'";
//				}
                                $sorg="select alokasi from ".$dbname.".organisasi where kodeorganisasi='".$kodeorg."'";
                                $qorg=mysql_query($sorg) or die(mysql_error());
                                $rorg=mysql_fetch_assoc($qorg);
                                //if($rorg['induk']=='')
//				{
//				$rorg['induk']=$rorg['alokasi'];
//				}
                                $kd_org=$rorg['alokasi'];
                                $ins="insert into ".$dbname.".log_prapoht (`nopp`,`kodeorg`,`tanggal`,`dibuat`) values ('".$nopp."','".$kd_org."','".$tgl."','".$id_user."')";
                                $qry=mysql_query($ins) or die(mysql_error());
                                $data['tgl_sdt']=tanggalsystem($data['tgl_sdt']);
                                #$query="insert into ".$dbname.".log_prapodt (`nopp`,`kodebarang`,`kd_anggran`,`jumlah`,`tgl_sdt`,`keterangan`) values ('".$data['kode']."','".$data['kd_brg']."','".$data['kd_angrn']."','".$data['jmlhDiminta']."','".$data['tgl_sdt']."','".$data['ket']."')";
								$query="insert into ".$dbname.".log_prapodt (`nopp`,`kodebarang`,`kd_anggran`,`jumlah`,`tgl_sdt`,`keterangan`) values ('".$data['kode']."','".$data['kd_brg']."','','".$data['jmlhDiminta']."','".$data['tgl_sdt']."','".$data['ket']."')";
                                # Insert Data
                                if(!mysql_query($query)) {
                                echo "DB Error 2 : ".mysql_error($conn);
                                }

                        }
            break;
        case 'detail_edit' :
            # Check Valid Data
            if(($data['nopp']=='') or ($data['kd_brg']=='') or ($data['jmlhDiminta']=='')) {
                echo "Error : Data should not be empty";
                exit;
            }

            # Rearrange Data
                        $data['tgl_sdt']=tanggalsystem($data['tgl_sdt']);

            # Create Condition
            $where = "`nopp`='".$data['nopp']."'";
            $where .= " and `kodebarang`='".$data['kd_brg']."'";

            # Make Query
           // unset($data['nopp']);
            //unset($data['kd_brg']);
                        //$column=array('kodebarang','kd_anggran','jumlah','tgl_sdt','keterangan');
           // $query = updateQuery($dbname,'log_prapodt',$data,$column,$where);
                   #$query = "update ".$dbname.".`log_prapodt` set kodebarang='".$data['kd_brg']."',kd_anggran='".$data['kd_angrn']."',jumlah='".$data['jmlhDiminta']."',tgl_sdt='".$data['tgl_sdt']."', keterangan='".$data['ket']."' where `nopp`='".$data['nopp']."' and `kodebarang`='".$data['oldKdbrg']."'";
				   $query = "update ".$dbname.".`log_prapodt` set kodebarang='".$data['kd_brg']."',kd_anggran='',jumlah='".$data['jmlhDiminta']."',tgl_sdt='".$data['tgl_sdt']."', keterangan='".$data['ket']."' where `nopp`='".$data['nopp']."' and `kodebarang`='".$data['oldKdbrg']."'";
            # Update Data
            if(!mysql_query($query)) {
                echo "DB Error 3 : ".mysql_error($conn);
            }
            echo $query; exit();
            break;

        case 'detail_delete' :
            $data = $_POST;

            # Rearrange Data
            $tmpTgl = tanggalsystem($data['tgl_sdt']);
            $data['tgl_sdt'] = $tmpTgl;


            # Create Condition
            $where = "`nopp`='".$data['nopp']."'";
            $where .= " and `kodebarang`='".$data['kd_brg']."'";

            # Create Query
            $query = "delete from `".$dbname."`.`log_prapodt` where ".$where;
			$query1 = "delete from `".$dbname."`.`log_cipdt` where ".$where;
            //echo query;
            # Delete
            if(!mysql_query($query) && !mysql_query($query1)) {
                echo "DB Error 4 : ".mysql_error($conn);
            }
			else{
				# Hapus data di tabel "log_cipdt"
				$queryz = "delete from `".$dbname."`.`log_cipdt` where nocip='".$data['nocip']."'";
				if(!mysql_query($queryz)) {
					echo "DB Error 5 : ".mysql_error($conn);
				}
			}
            break;
			case 'getCIP' :
            
        $dat.="<fieldset><legend>".$_SESSION['lang']['result']."</legend>";
        $dat.="<div style=overflow:auto;width:100%;height:310px;>";
        $dat.="<table cellpadding=1 cellspacing=1 border=0 class='sortable'><thead>";
        $dat.="<tr class='rowheader'><td>No.</td>";
        $dat.="<td>No. CIP</td>";
        $dat.="<td>Nama Organisasi</td></tr></thead><tbody>";
        if($param['txtfind']!='')
        {
            $where="where nocip like '%".$param['txtfind']."%'";
        }
        $sPo="select distinct nocip,kodeorg,tanggal from ".$dbname.".log_cipht 
             ".$where."  order by tanggal desc";
        //exit("Error". $sPo);
        echo $sPo;
       
        echo $_SESSION['org']['kodeorganisasi'];
        $qPo=mysql_query($sPo) or die(mysql_error($conn));
        while($rPo=mysql_fetch_assoc($qPo))
        {
            $no+=1;
            $dat.="<tr class='rowcontent' onclick=\"setPo('".$rPo['nopo']."','".$rPo['nilaipo']."','".$param['jnsInvoice']."','".$rPo['ppn']."')\" style='pointer:cursor;'><td>".$no."</td>";
            $dat.="<td>".$rPo['nopo']."</td>";
            $dat.="<td>".$optNmsupp[$rPo['kodesupplier']]."</td></tr>";
        }
        $dat.="</tbody></table></div></fieldset>";
        echo $dat;
        default :
            break;
    }
}


	switch($prosesz) {
		case 'getCIP' :
        $nopp2=$param['nopp'];
		$nomor=$param['nomor'];
		$nopp=substr($nopp2,15,4);	
		//exit("Error". $nopp);
        $dat.="<fieldset><legend>".$_SESSION['lang']['result']."</legend>";
        $dat.="<div style=overflow:auto;width:100%;height:310px;>";
        $dat.="<table cellpadding=1 cellspacing=1 border=0 class='sortable'><thead>";
        $dat.="<tr class='rowheader'><td align=center>No.</td>";
        $dat.="<td align=center>No. CIP</td>";
        //$dat.="<td align=center>Nama Organisasi</td>
		$dat.="<td align=center>".$_SESSION['lang']['keterangan']."</td>
		</tr></thead><tbody>";
        if($param['txtfind']!='')
        {
            $where="where nocip like '%".$param['txtfind']."%' and nocip like '%".$nopp."%' or keterangan like '%".$param['txtfind']."%'";
			#$where="where nocip like '%".$param['txtfind']."%'";
			
        }
		else{
			$where="where nocip like '%".$nopp."%' or keterangan like '%".$param['txtfind']."%'";
		}
        $sPo="select distinct nocip,kodeorg,keterangan,tanggal from ".$dbname.".log_cipht ".$where." order by nocip asc";
        //exit("Error". $sPo);
        //echo $sPo;
       
        
        $qPo=mysql_query($sPo) or die(mysql_error($conn));
        while($rPo=mysql_fetch_assoc($qPo))
        {
            $no+=1;
            $dat.="<tr class='rowcontent' onclick=\"setCIP('".$rPo['nocip']."','".$rPo['kodeorg']."','".$nomor."')\" style='pointer:cursor;'><td align=center>".$no."</td>";
            $dat.="<td align=center>".$rPo['nocip']."</td>";
			$dat.="<td align=center>".$rPo['keterangan']."</td></tr>";
            //$dat.="<td align=center>".$rPo['kodeorg']."</td></tr>";
        }
        $dat.="</tbody></table></div></fieldset>";
        echo $dat;
        default :
           break;
	}
	

function createTabDetail($id,$data) {
        global $dbname;
        global $conn;
        global $key;

    //echo "<button class=mybutton onclick=addNewRow('detailBody',true)>Add Details</button><br />";
    $table = "<b>".$_SESSION['lang']['nopp']."</b> : ".makeElement("detail_kode",'text',$id,array('disabled'=>'disabled','style'=>'width:150px'));
    $table .= "<table id='ppDetailTable'>";
    # Header
    $table .= "<thead>";
    $table .= "<tr>";
    $table .= "<td align=center>".$_SESSION['lang']['kodebarang']."</td>";
    $table .= "<td align=center>".$_SESSION['lang']['namabarang']."</td>";
    $table .= "<td align=center>".$_SESSION['lang']['satuan']."</td>";
	#penambahan satu kolom u/ No. CIP sesuai dengan request no : 09 (27/11/2015)
	$table .= "<td align=center>No. CIP</td>";
	#end
    #$table .= "<td align=center>".$_SESSION['lang']['kodeanggaran']."</td>";
    $table .= "<td align=center>".$_SESSION['lang']['jmlhDiminta']."</td>";
    $table .= "<td align=center>".$_SESSION['lang']['tanggalSdt']."</td>";
    $table .= "<td align=center>".$_SESSION['lang']['keterangan']."</td>";
//    $table .= "<td>"."<a href=# onclick=addNewRow(detailBody,true)><img src='images\newfile.png'></a>"."</td>";
    $table .= "<td colspan=3 align=center>Action</td>";
    $table .= "</tr>";
    $table .= "</thead>";

    # Data
    $table .= "<tbody id='detailBody'>";

    $i=0;

    #======= Display Data =======
    if($data!=array()) {
        foreach($data as $key=>$row) {
                        $ql="select * from ".$dbname.".`log_5masterbarang` where `kodebarang`='".$row['kodebarang']."'"; //echo $ql;
                        $qry=mysql_query($ql) or die(mysql_error());
                        $res=mysql_fetch_assoc($qry);
                /*	
                        $ql2="select * from ".$dbname.".`keu_anggaran` where `kodeanggaran`='".$row['kd_anggran']."'"; //echo $ql;
                        $qry2=mysql_query($ql2) or die(mysql_error());
                        $res2=mysql_fetch_assoc($qry2);
                */	
            $tmpTgl = tanggalnormal($row['tgl_sdt']);
            $row['tgl_sdt'] = $tmpTgl;
            $table .= "<tr id='detail_tr_".$key."' class='rowcontent'>";
            $table .= "<td onclick=\"searchBrg('".$_SESSION['lang']['findBrg']."','<fieldset><legend>".$_SESSION['lang']['findnoBrg']."</legend>".$_SESSION['lang']['find']."<input type=text class=myinputtext id=no_brg><button class=mybutton onclick=findBrg()>".$_SESSION['lang']['find']."</button></fieldset><div id=container></div><input type=hidden id=nomor name=nomor value=".$key.">',event)\";>".makeElement("kd_brg_".$key."",'txt',$row['kodebarang'],
                array('style'=>'width:120px','disabled'=>'disabled','class=myinputtext'))."</td>";
            $table .= "<td onclick=\"searchBrg('".$_SESSION['lang']['findBrg']."','<fieldset><legend>".$_SESSION['lang']['findnoBrg']."</legend>".$_SESSION['lang']['find']."<input type=text class=myinputtext id=no_brg><button class=mybutton onclick=findBrg()>".$_SESSION['lang']['find']."</button></fieldset><div id=container></div><input type=hidden id=nomor name=nomor value=".$key.">',event)\";>".makeElement("nm_brg_".$key."",'txt',$res['namabarang'],
                array('style'=>'width:120px','disabled'=>'disabled','class=myinputtext'))."</td>";
            $table .= "<td onclick=\"searchBrg('".$_SESSION['lang']['findBrg']."','<fieldset><legend>".$_SESSION['lang']['findnoBrg']."</legend>".$_SESSION['lang']['find']."<input type=text class=myinputtext id=no_brg><button class=mybutton onclick=findBrg()>".$_SESSION['lang']['find']."</button></fieldset><div id=container></div><input type=hidden id=nomor name=nomor value=".$key.">',event)\";>".makeElement("sat_".$key."",'txt',$res['satuan'],
                array('style'=>'width:70px','disabled'=>'disabled','class=myinputtext'))."<img src=images/search.png class=dellicon title=".$_SESSION['lang']['find']." onclick=\"searchBrg('".$_SESSION['lang']['findBrg']."','<fieldset><legend>".$_SESSION['lang']['findnoBrg']."</legend>".$_SESSION['lang']['find']."<input type=text class=myinputtext id=no_brg><button class=mybutton onclick=findBrg()>".$_SESSION['lang']['find']."</button></fieldset><div id=container></div><input type=hidden id=nomor name=nomor value=".$key.">',event)\";><input type=hidden id=oldKdbrg_".$key." name=oldKdbrg_".$key." value='".$row['kodebarang']."'></td>";
            ###penambahan fitur baru CIP
			$table .= "<td>".makeElement("nocip_".$key."",'txt',$row['nocip'],
                array('style'=>'width:120px','disabled'=>'disabled','class=myinputtext'))."<img src=images/search.png class=dellicon title=".$_SESSION['lang']['find']." onclick=\"searchCIP('Mencari CIP','<fieldset><legend>".$_SESSION['lang']['find']." CIP</legend><input type=text class=myinputtext id=no_cip><button class=mybutton onclick=findNoCIP()>".$_SESSION['lang']['find']."</button></fieldset><div id=container></div><input type=hidden id=nomor name=nomor value=".$key.">',event)\";></td>";
			#################################################################################################
			#$table .= "<td>".makeElement("kd_angrn_".$key."",'txt','',
            #    array('style'=>'width:70px','disabled'=>'disabled','class=myinputtext'))."<img src=images/search.png class=dellicon title=".$_SESSION['lang']['find']." onclick=\"searchAngrn('".$_SESSION['lang']['findAngrn']."','<fieldset><legend>".$_SESSION['lang']['findnoAngrn']."</legend>".$_SESSION['lang']['find']."<input type=text class=myinputtext id=no_angrn><button class=mybutton onclick=findAngrn()>".$_SESSION['lang']['find']."</button></fieldset><div id=container></div><input type=hidden id=nomor name=nomor value=".$key.">',event)\";></td>";
            $table .= "<td>".makeElement("jmlhDiminta_".$key."",'textnum',$row['jumlah'],
                array('style'=>'width:70px','onkeypress'=>'return angka_doang(event)','class=myinputtext'))."</td>";	
            $table .= "<td>".makeElement("tgl_sdt_".$key."",'txt',$row['tgl_sdt'],
        array('style'=>'width:70px','onkeypress'=>'return tanpa_kutip(event)','onmousemove'=>'setCalendar(this.id)','readonly'=>'readonly','class=myinputtext'))."</td>";
            $table .= "<td>".makeElement("ket_".$key."",'txt',$row['keterangan'],
                array('style'=>'width:130px','class=myinputtext','onkeypress'=>'return tanpa_kutip(event)'))."</td>";
            $table .= "<td><img id='detail_edit_".$key."' title='Edit' class=zImgBtn onclick=\"editDetail('".$key."')\" src='images/save.png'/>";
            $table .= "&nbsp;<img id='detail_delete_".$key."' title='Hapus' class=zImgBtn onclick=\"deleteDetail('".$key."')\" src='images/delete_32.png'/></td>";
                        $table .= "</tr>";
            $i = $key;
        }

                $i++;
    }

    #======= New Row ===========
    $table .= "<tr id='detail_tr_".$i."' class='rowcontent'>";
        $table .= "<td>".makeElement("kd_brg_".$i."",'txt','',array('style'=>'width:120px','disabled'=>'disabled','class=myinputtext'))."</td>";
        $table .= "<td>".makeElement("nm_brg_".$i."",'txt','',array('style'=>'width:120px','disabled'=>'disabled','class=myinputtext'))."</td>";
        $table .= "<td>".makeElement("sat_".$i."",'txt','',array('style'=>'width:70px','disabled'=>'disabled','class=myinputtext'))."<img src=images/search.png class=dellicon title=".$_SESSION['lang']['find']." onclick=\"searchBrg('".$_SESSION['lang']['findBrg']."','<fieldset><legend>".$_SESSION['lang']['findnoBrg']."</legend>".$_SESSION['lang']['find']."<input type=text class=myinputtext id=no_brg><button class=mybutton onclick=findBrg()>".$_SESSION['lang']['find']."</button></fieldset><input type=hidden id=nomor name=nomor value=".$i."><div id=container></div>',event)\";><input type=hidden id=oldKdbrg_".$i." name=oldKdbrg_".$i.">"."</td>";
        ###penambahan fitur baru CIP
		$table .= "<td>".makeElement("nocip_".$i."",'txt','',array('style'=>'width:120px','disabled'=>'disabled','class=myinputtext'))."<img src=images/search.png class=dellicon title='".$_SESSION['lang']['find']." CIP' onclick=\"searchCIP('".$_SESSION['lang']['find']." CIP','<fieldset><legend>".$_SESSION['lang']['find']." CIP</legend><input type=text class=myinputtext id=no_cip><button class=mybutton onclick=findNoCIP()>".$_SESSION['lang']['find']."</button></fieldset><input type=hidden id=nomor name=nomor value=".$i."><div id=container></div>',event)\";>";
		#######################################################################################################################
		#$table .= "<td>".makeElement("kd_angrn_".$i."",'txt','',array('style'=>'width:70px','disabled'=>'disabled','class=myinputtext'))."<img src=images/search.png class=dellicon title=".$_SESSION['lang']['find']." onclick=\"searchAngrn('".$_SESSION['lang']['findAngrn']."','<fieldset><legend>".$_SESSION['lang']['findnoAngrn']."</legend>".$_SESSION['lang']['find']."<input type=text class=myinputtext id=no_angrn><button class=mybutton onclick=findAngrn()>".$_SESSION['lang']['find']."</button></fieldset><input type=hidden id=nomor name=nomor value=".$i."><div id=container></div>',event)\";></td>";
        $table .= "<td>".makeElement("jmlhDiminta_".$i."",'textnum','',array('style'=>'width:70px','onkeypress'=>'return angka_doang(event)','class=myinputtext'))."</td>";	
        $table .= "<td>".makeElement("tgl_sdt_".$i."",'txt','',array('style'=>'width:70px','onkeypress'=>'return tanpa_kutip(event)','onmousemove'=>'setCalendar(this.id)','readonly'=>'readonly','class=myinputtext'))."</td>";
        $table .= "<td>".makeElement("ket_".$i."",'txt','',array('style'=>'width:130px','class=myinputtext','onkeypress'=>'return tanpa_kutip(event)'))."</td>";
        $table .= makeElement("nopp_".$i."",'hidden',$id,array('style'=>'width:70px','onkeypress'=>'return tanpa_kutip(event)'))."</td>";


    # Add, Container Delete
    $table .= "<td><img id='detail_add_".$i."' title='Simpan' class=zImgBtn onclick=\"addDetail('".$i."')\" src='images/save.png'/>";
    $table .= "&nbsp;<img id='detail_delete_".$i."' /></td>";
    $table .= "</tr>";

    $table .= "</tbody>";
    $table .= "</table>";
    echo $table;
}
?>