<template>
  <v-container pa-0 fluid>
    <v-toolbar class="pt-1" flat dense>
      <v-file-input
        style="font-size: 16px;
              max-width: 25%;
              text-align: left;"
        class="pt-6 pl-0"
        show-size
        label="File input"
        v-model="filePath"
        @change="Import()"
        @click:clear="dataList=[]"
      ></v-file-input>
      <span>{{spacer}}</span>
      <v-btn @click="Generate()" width="100px">GENERATE</v-btn>
      <span>{{spacer}}</span>
      <v-btn @click="ExecuteAll()" width="300px">DOWNLOAD PDF AND TEXTFILE</v-btn>
      <!-- <span>{{spacer}}</span>
      <v-btn @click="ExportToPDF()" width="200px">DOWNLOAD PDF</v-btn> -->
      <!-- <span>{{spacer}}</span>
      <v-btn @click="ExportToTxt()" width="200px">DOWNLOAD TEXTFILE</v-btn> -->
    </v-toolbar>

    <v-simple-table class="pa-0 ma-0" id="myTable">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">MATERIALS</th>
            <th class="text-left">WHOLE</th>
            <th class="text-left">SHARED</th>
            <th class="text-left">TOTALCOUNT</th>
            <th class="text-left">CODE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataList2" :key="item.ID">
            <td>{{ item.MATERIALS }}</td>
            <td>
              <span v-if="item.WHOLE != 0">{{ item.WHOLE }}</span>
            </td>
            <td>
              <span v-if="item.SHARED != 0">{{ item.SHARED }}</span>
            </td>
            <td>
              <span v-if="item.TOTALCOUNT != 0">{{ item.TOTALCOUNT }}</span>
            </td>
            <td>{{ item.CODE }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>


<script>
import axios from "axios";
import Swal from "sweetalert2";
import papa from "papaparse";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  data() {
    return {
      // api: "http://10.169.130.155:5001",
      filePath: null,
      dataList: [],
      dataList2: [],
      docDefinition: {},
      generateAccess: false,
      spacer: "　",
    };
  },

  created() {},
  computed: {},
  watch: {
    dataList2() {
      if (this.dataList2.length > 0) {
        this.generateAccess = true;
      } else {
        this.generateAccess = false;
      }
    },
  },
  methods: {
    Import() {
      if (this.filePath) {
        this.dataList = [];
        this.dataList2 = [];

        let myVar = this.dataList;
        let cntKey = 0;
        let Reader = new FileReader();
        Reader.readAsText(this.filePath, "Shift-JIS");
        Reader.onload = function () {
          let Papa = papa;
          Papa.parse(Reader.result, {
            header: false,
            step: function (row) {
              myVar.push({
                key: (cntKey = cntKey + 1),
                a: row.data[0],
                b: row.data[1],
                c: row.data[2],
                d: row.data[3],
                e: row.data[4],
                f: row.data[5],
                g: row.data[6],
              });
            },
          });
        };
      }
    },

    Generate() {
      if (this.filePath) {
        if (this.filePath.name.length == 16) {
          this.generateAccess = true;
          let master = [
            { Materials: 1, Whole: 1, Shared: "1 shared", Code: "0021" },
            { Materials: 2, Whole: 2, Shared: "2 shared", Code: "0022" },
            {
              Materials: "3A",
              Whole: "3A",
              Shared: "3A shared",
              Code: "0023A",
            },
            {
              Materials: "3B",
              Whole: "3B",
              Shared: "3B shared",
              Code: "0023B",
            },
            {
              Materials: "3C",
              Whole: "3C",
              Shared: "3C shared",
              Code: "0023D",
            },
            {
              Materials: "3D",
              Whole: "3D",
              Shared: "3D shared",
              Code: "0023E",
            },
            {
              Materials: "4A",
              Whole: "4A",
              Shared: "4A shared",
              Code: "0024A",
            },
            {
              Materials: "4B",
              Whole: "4B",
              Shared: "4B shared",
              Code: "0024B",
            },
            {
              Materials: "5A",
              Whole: "5A",
              Shared: "5A shared",
              Code: "0025A",
            },
            {
              Materials: "5B",
              Whole: "5B",
              Shared: "5B shared",
              Code: "0025B",
            },
            {
              Materials: "5C",
              Whole: "5C",
              Shared: "5C shared",
              Code: "0025C",
            },
            { Materials: 6, Whole: 6, Shared: "6 shared", Code: "0026" },
            { Materials: 7, Whole: 7, Shared: "7 shared", Code: "0027" },
            { Materials: 8, Whole: 8, Shared: "8 shared", Code: "0028" },
            { Materials: 9, Whole: 9, Shared: "9 shared", Code: "0029" },
            { Materials: 10, Whole: 10, Shared: "10 shared", Code: "0030" },
            { Materials: 11, Whole: 11, Shared: "11 shared", Code: "0031" },
            { Materials: 12, Whole: 12, Shared: "12 shared", Code: "0043" },
            { Materials: 13, Whole: 13, Shared: "13 shared", Code: "0044" },
            {
              Materials: "14A",
              Whole: "14A",
              Shared: "14A shared",
              Code: "0045A",
            },
            {
              Materials: "14B",
              Whole: "14B",
              Shared: "14B shared",
              Code: "0045B",
            },
            {
              Materials: "15A",
              Whole: "15A",
              Shared: "15A shared",
              Code: "0046A",
            },
            {
              Materials: "15B",
              Whole: "15B",
              Shared: "15B shared",
              Code: "0046B",
            },
            {
              Materials: "16A",
              Whole: "16A",
              Shared: "16A shared",
              Code: "0047A",
            },
            {
              Materials: "16B",
              Whole: "16B",
              Shared: "16B shared",
              Code: "0047B",
            },
          ];

          let whole = [];
          whole = master.map((rec) => {
            let item = this.dataList.filter((rec2) => {
              return rec2.c == rec.Whole;
            }).length;
            return item;
          });

          // console.log("WHOLE:", whole);

          let shared = [];
          shared = master.map((rec) => {
            let item = this.dataList.filter((rec2) => {
              return rec2.c == rec.Shared;
            }).length;
            return item;
          });

          for (let i = 0; i < master.length; i++) {
            master[i].MATERIALS = master[i].Materials;
            master[i].WHOLE = whole[i];
            master[i].SHARED = shared[i];
            if (
              (master[i].MATERIALS == 1 && whole[i] != 0) ||
              (master[i].MATERIALS == "3A" && whole[i] != 0) ||
              (master[i].MATERIALS == "3B" && whole[i] != 0) ||
              (master[i].MATERIALS == "3C" && whole[i] != 0) ||
              (master[i].MATERIALS == "3D" && whole[i] != 0) ||
              (master[i].MATERIALS == 6 && whole[i] != 0)
            ) {
              master[i].TOTALCOUNT = Math.trunc(whole[i] + 1 + shared[i] / 2);
            } else {
              master[i].TOTALCOUNT = Math.trunc(whole[i] + shared[i] / 2);
            }
            master[i].CODE = master[i].Code;
            master[i].ID = i;
          }

          this.dataList2 = master;
          // console.log(master);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please input a valid file !!",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please input file !!",
        });
      }
    },

    ExportToPDF() {
    
      if (this.filePath) {
        if (this.generateAccess == true) {
          if (this.filePath.name.length == 16) {
            let arr = [];
            let data = this.dataList2;
            let controlNumber = this.filePath.name.slice(0, 12);

            for (let i = 0; i < data.length; i++) {
              if (data[i].WHOLE != 0) {
                data[i].WHOLE;
              } else {
                data[i].WHOLE = "";
              }
              if (data[i].SHARED != 0) {
                data[i].SHARED;
              } else {
                data[i].SHARED = "";
              }
              if (data[i].TOTALCOUNT != 0) {
                data[i].TOTALCOUNT;
              } else {
                data[i].TOTALCOUNT = "";
              }

              if (data[i].WHOLE != 0 || data[i].SHARED != 0) {
                data[i].MATERIALS;
              } else {
                data[i].MATERIALS = "*";
              }
              if (data[i].WHOLE != 0 || data[i].SHARED != 0) {
                data[i].CODE;
              } else {
                data[i].CODE = "*";
              }
            }
            arr.push([
              { text: "Materials", style: "tableHeader" },
              { text: "Whole", style: "tableHeader" },
              { text: "Shared", style: "tableHeader" },
              { text: "Total", style: "tableHeader" },
              { text: "Code", style: "tableHeader" },
            ]);
            for (let i = 0; i < data.length; i++) {
              let toPush = [];
              toPush = [
                { text: data[i].MATERIALS, style: "tableData" },
                { text: data[i].WHOLE, style: "tableData" },
                { text: data[i].SHARED, style: "tableData" },
                { text: data[i].TOTALCOUNT, style: "tableData" },
                { text: data[i].CODE, style: "tableData" },
              ];
              arr.push(toPush);
            }
            this.docDefinition = {
              info: {
                title: controlNumber,
                author: "CHARLES CUTE",
              },
              content: [
                { text: controlNumber, style: "header" },
                {
                  margin: [80, 0],

                  table: {
                    headerRows: 1,
                    body: arr,
                  },
                },
              ],
              styles: {
                tableHeader: {
                  bold: true,
                  fontSize: 21,
                  color: "black",
                  alignment: "center",
                },
                tableData: {
                  fontSize: 17,
                  color: "black",
                  alignment: "center",
                },
                header: {
                  bold: true,
                  fontSize: 25,
                  color: "black",
                  margin: [165, 0, 0, 0],
                },
              },
            };
            // console.log(this.docDefinition);
            // console.log(this.api)
            axios.post(
              `${this.api}SaveFile/${controlNumber}`,
              this.docDefinition
            ).then(res=>{
              console.log(res.data)
            });
            // pdfMake.createPdf(this.docDefinition).download(`${controlNumber}.pdf`);
            pdfMake.createPdf(this.docDefinition).open();
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please input a valid file !!",
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Generate First !!",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please input file !!",
        });
      }
    },

    ExportToTxt() {
      if (this.filePath) {
        if (this.generateAccess == true) {
          if (this.filePath.name.length == 16) {
            let controlNumber = this.filePath.name.slice(0, 12);
            // let filename = controlNumber;
            let text = "";
            let toText = this.dataList2.filter((rec) => {
              return rec.TOTALCOUNT != 0;
            });
            for (let i = 0; i < toText.length; i++) {
              text = text + `271,${toText[i].CODE},${toText[i].TOTALCOUNT}\n`;
            }
            text = text + "271,0020F,1";
            axios.post(`${this.api}SaveTextFile/${controlNumber}`, {
              text: text,
            });
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Exported Successfully!",
              showConfirmButton: false,
              timer: 700,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please input a valid file !!",
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Generate First !!",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please input file !!",
        });
      }
    },

    ExecuteAll() {
      this.ExportToPDF()
      this.ExportToTxt()
    }
  },
};
</script>
<style scoped>
</style>