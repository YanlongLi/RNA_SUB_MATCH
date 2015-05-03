/* =============================================================================
#     FileName: main.js
#         Desc:  
#       Author: YanlongLi
#        Email: lansunlong@gmail.com
#     HomePage: 
#      Created: 2015-05-03 14:41:40
#      Version: 0.0.1
#   LastChange: 2015-05-03 14:41:40
#      History:
#               0.0.1 | YanlongLi | init
============================================================================= */

var ref_rna = "GUUGUGGACGUUGAGCUCCUUUCGGUCCAAAAAGGGGUGUUGCUGUGGGUCGAUUGAGCUGCUGGGUCAUGGAUCCCGUUAGCCUACUCCAUGUUCAUCAUUCAGCUCGAGAUCUGAAAGAAACUACUCCAAUUUAUACUAAUAGUAUGUGUGUAGAUAGGAAAAUGAUGGAGUACUCGUUGUUGGGAUAGGCUUAUGGCUUGCAUGCCCCAGGAGCUGCAUCAACCCUACAUGGACCCUCUUUGGAUUGAAGGGAGCUCUGCAUCUUUUGU";

var ori_strs = [
  "GGAGGGUGACAGAAGAGAGUGAGCACACGUGGUUGUUUCCUUGCAUAAAUGAUGCCUAUGCUUGGAGCUACGCGUGCUCACUUCUCUCUCUGUCACCUCC",
  "GUGUGCCUGGCUCCCUGUAUGCCACACAUGUAGACCAACCCAUGGUGUCUGGUUGCCUACUGGGUGGCGUGCAAGGAGCCAAGCAUGC",
  "GUGAGAAGGACCGCGUUGGAGAAGCAGGGCACGUGCAUGCAUAUGUUCAUCAUCAUCUUCUUCCUCCUCCUCUAGCUCCAGCCUUGUGUGGGUUGGAAGUUUAGAUAGAACUCGCACUGCACGUGGUCUCCUUCUCCAUCCCGGUCUUUUUCUCAC",
  "UGAAGCUAUUUGCUUCUGAGUGGAAUGUUGUCUGGUUCAAGGUCUCAUGCACCUUGCGGUUUUGAGGAUGAUUUGUGCAAGGUUUUUCAUUCCUCUCAUCCGUGGGAUCUCGGACCAGGCUUCAUUCCCCUCAGAGAUAGCUUCA",
  "UAGUGUGAAUGAGUGAAGCUGCCAGCAUGAUCUAGCUCUGAUUAAUCGGCACUGUUGGCGUACAGUCGAUUGACUAAUCGUCAGAUCUGUGUGUGUAAAUCACUGUUAGAUCAUGCAUGACAGCCUCAUUUCUUCACACUG",
  "CGCCGGCGGCCUGACAUUGGGAUCGGAGGCCAUGGUGCAGCCAAGGAUGACUUGCCGAUCGAUCGAUCUAUCUAUGAAGCUAAGCUAGCUGGCCAUGGAUCCAUCCAUCAAUUGGCAAGUUGUUCUUGGCUACAUCUUGGCCCCUGCUCCUCAUGUAAGGCCGGCCUGUGGCG",
  "GGAAAGAGCGAUAUUGGUGAGGUUCAAUCCGAUGAUUGGUUUUACAGCAGUGGUAAAAUCAGUAUCUGAUUGAGCCGCGCCAAUAUCUCUUCCUCU",
  "CUUUGUGAUCUUCCACAGCUUUCUUGAACUGCACGCAUGAUGAAUAAUCCCUUUGGUUAAUUGUGAUCUGGUCUCUGAGAGAUCGUAGUUAGACUCGAUCGGUUGCAUUGGCAUCAGAGAGAGCAGUUCAAUAAAGCUGUGGGAAAUUGCAGAG",
  "AUGCAAUUGGGGGCAGCAAGCUAGAGGUGGCAACUGCAUAAUUUGCAAGAAAUUGUUGGCUGAAGAUCAUACCGAUGAUAUUCUUGCAAGUUAUGCAGUUGCUGCCUCAAGCUUGCUGCCUCCUGUUGCCA"
];

var max_sel_length = 10;

$(document).ready(function() {
  $("#reload_data").click(on_reload_click);
  $("#ref_rna").html(ref_rna);
  var str = ori_strs.join("\n");
  $("#seq_rna").html(str);
});

function on_reload_click() {
  max_sel_length = $("#txt_max_sel_length").val();
  console.log(max_sel_length);
  ref_rna = +$("#ref_rna").text() || 10;
  ori_strs = $("#seq_rna").val().split("\n");
  re_bind();
}

function re_bind() {
  $("#ref_rna").on("select", function(e) {
    var sel_str = $("#ref_rna").selection();
    if(sel_str.length > 15){
      window.alert("too long, max length: " + max_sel_length);
      return;
    }
    $("#select").html("");
    generate_regexs(sel_str).forEach(function(str) {
      $("<option></option>").attr("value", str).html(str).appendTo("#select");
    });
    return;
  });
  $("#select").change(function(e) {
    var reg_str = "(" + $(this).val() + ")";
    var reg = new RegExp("(" + reg_str + ")", "g");
    var htmls = generate_match_html(reg, ori_strs);
    show_matched($("#sequence_wrapper"), htmls);
  });

}

function generate_match_html(reg, strs) {
  return strs.map(function(str) {
    return str.replace(reg, "<span class='hilight'>$1<\/span>");
  });
}

function show_matched(container, htmls) {
  container.html("");
  htmls.forEach(function(html) {
    var div = $("<div></div>").html(html).appendTo(container);
  });
}

function generate_regexs(str) {
  var regs = [str];
  regs = regs.concat(one_diff(), two_diff(), three_diff());
  return regs;

  function one_diff() {
    var len = str.length;
    if (len <= 1) {
      return [];
    }
    var ones = [];
    for (var i = 0; i < len; i++) {
      var arr = str.split("");
      arr[i] = '.';
      ones.push(arr.join(""));
    }
    return ones;
  }

  function two_diff() {
    var len = str.length;
    if (len <= 2) {
      return [];
    }
    var twos = [];
    for (var i = 0; i < len; i++) {
      for (var j = i + 1; j < len; j++) {
        var arr = str.split("");
        arr[i] = '.';
        arr[j] = '.';
        twos.push(arr.join(""));
      }
    }
    return twos;
  }

  function three_diff() {
    var len = str.length;
    if (len <= 3) {
      return [];
    }
    var threes = [];
    for (var i = 0; i < len; i++) {
      for (var j = i + 1; j < len; j++) {
        for (var k = j + 1; k < len; k++) {
          var arr = str.split("");
          arr[i] = '.';
          arr[j] = '.';
          arr[k] = '.';
          threes.push(arr.join(""));
        }
      }
    }
    return threes;
  }
}
