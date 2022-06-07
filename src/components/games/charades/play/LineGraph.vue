<template>
        <div>
            <div id="chart">
                <apexchart 
                    height="250"
                    :options="chartOptions"
                    :series="series"
                    ></apexchart>
            </div>
        </div>

</template>

<script>
//:class="scores.team1 < scores.team2 ? 'flex-grow-3' : 'flex-shrink-1'"
export default {
    name: 'LineGraph',
    
    props: {
            data: Array,
            pointSize: 0,
            showXLabs: true,
            showYLabs: true,
        },

    data(){
        return {
            series: [
                
            ],
            chartOptions: {
                chart: {
                    type: "line",
                },
                colors: ['#7CBDF9', '#6EE6B9', '#57B9D0', '#F4C246'],
                stroke: {
                        curve: 'straight',
                },
                markers: {
                    size: this.pointSize,
                },
                fill: {
                    type: 'solid'
                },
                //yaxis: [{
                //    labels: {
                //        show: this.showYLabs,
                //    }
                //}],
                xaxis: {
                    labels: {
                        show: this.showXLabs,
                    }
                },
                yaxis: {
                    labels: {
                        show: this.showYLabs,
                        floating: false,
                    }
                },
                toolbar: {
                    show: false,
                }
            }
        }
    },
    methods: {

    },
    mounted(){
        this.data.forEach((x) => {
            this.series.push({name: x.name, data:x.data})
        });
    },
}
</script>


<style scoped>

.team1{
    background: var(--v-primary-base);
    box-shadow: inset 5px 5px 8px var(--v-primary-darken1);
}

.team2{
    background: var(--v-secondary-base);
    box-shadow: inset 5px 5px 8px var(--v-secondary-darken1);
}


</style>