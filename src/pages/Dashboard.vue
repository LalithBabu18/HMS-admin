<template>
  <div v-if="isLoading">
    <div v-for="post in fakeArray" :key="post.id">
      <!-- <h1>{{post[2]}}</h1> -->
      <center></center>
      <mdb-container>
        <mdb-horizontal-bar-chart
          :data="post[1]"
          :options="post[2]"
          :width="600"
          :height="300"
        ></mdb-horizontal-bar-chart>
      </mdb-container>
    </div>
  </div>
</template>

<script>
import { mdbHorizontalBarChart, mdbContainer } from "mdbvue";
import User from "@/api/user.js";
import _ from "lodash";
const userReports = new User();
export default {
  components: {
    mdbHorizontalBarChart,
    mdbContainer
  },
  data() {
    return {
      isLoading: false,
      myFacilities: "",
      facilityids: [],
      reportHistory: [],
      userReports: [],
      fakeArray: [],
      graphBool: false,
      resultArray: []
    };
  },
  async created() {
    this.fakeArray = [];
    await userReports
      .reportGraph()
      .then(resp => {
        // console.log(resp, "resp");
        this.fakeArray = resp;
        console.log(this.fakeArray);
      })
      .then(() => {
        Promise.all(
          this.fakeArray.map((item, i) => {
            // console.log(item, i);
            let mainArrayKeys = [];
            let subArrayKeys = [];
            let mainArrayValues = [];
            let subArrayValues = [];
            mainArrayKeys = Object.keys(item);
            subArrayKeys = Object.keys(item.facility);

            let newMainArrayKeys = _.remove(mainArrayKeys, function(n) {
              return (
                n != "id" &&
                n != "facilityId" &&
                n != "reportDate" &&
                n != "isAntigenTestingDone" &&
                n != "remarks" &&
                n != "facility" &&
                n != "isAntigenTestingDone"
              );
            });
            newMainArrayKeys.map(even => {
              mainArrayValues.push(item[even]);
            });

            let newSubArrayKeys = _.remove(subArrayKeys, function(n) {
              return (
                n != "id" &&
                n != "type" &&
                n != "region" &&
                n != "address" &&
                n != "phone" &&
                n != "contactPerson" &&
                n != "email" &&
                n != "name" &&
                n != "isActive" &&
                n != "active"
              );
            });

            newSubArrayKeys.map(odd => {
              subArrayValues.push(item.facility[odd]);
            });
            let horizontalBarChartData = {
              labels: [],
              datasets: [
                {
                  label: "",
                  data: [],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(60, 250, 78, 0.2)",
                    "rgba(190, 162, 235, 0.2)"
                  ],
                  borderColor: [
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)"
                  ],
                  borderWidth: 1
                }
              ]
            };

            let horizontalBarChartOptions = {
              responsive: false,
              maintainAspectRatio: false,
              scales: {
                xAxes: [
                  {
                    barPercentage: 1,
                    gridLines: {
                      display: true,
                      color: "rgba(0, 0, 0, 0.1)"
                    }
                  }
                ],
                yAxes: [
                  {
                    gridLines: {
                      display: true,
                      color: "rgba(0, 0, 0, 0.1)"
                    }
                  }
                ]
              }
            };
            console.log(item.facility.name);
            let totalArrayKeys = newMainArrayKeys.concat(newSubArrayKeys);
            let totalArrayValues = mainArrayValues.concat(subArrayValues);
            let chartData = horizontalBarChartData;
            chartData.datasets[0].data.push(...totalArrayValues);
            chartData.labels.push(...totalArrayKeys);
            chartData.datasets[0].label = item.facility.name;

            console.log(chartData, "ccccccc");
            this.fakeArray[i] = [
              this.fakeArray[i],
              chartData,
              horizontalBarChartOptions
            ];
          })
        );
        this.isLoading = true;

        console.log(this.fakeArray, "fakeArrayNew");
      });
  }
};
</script>

<style>
.navbar-brand {
  margin-left: 35%;
}
</style>
