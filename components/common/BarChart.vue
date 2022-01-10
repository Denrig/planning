<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  props: ['data', 'options', 'labels'],
  watch: {
    data() {
      this.handleRenderChart();
    },
  },
  mounted() {
    this.handleRenderChart();
  },
  methods: {
    handleRenderChart() {
      this.renderChart(
        {
          labels: this.labels,
          datasets: [
            {
              label: 'Results',
              backgroundColor: '#fa357b',
              data: this.data,
            },
          ],
        },
        {
          ...this.options,
          scales: {
            yAxes: [
              {
                ticks: {
                  stepSize: 1,
                  beginAtZero: true,
                },
                gridLines: {
                  display: false,
                  color: '#979797',
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        },
      );
    },
  },
};
</script>
