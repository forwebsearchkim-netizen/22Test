// =============================================================================
// Dashio - Chart.js Integration
// =============================================================================

import Chart from 'chart.js/auto'

// Get CSS variable value
function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

// Get current primary color (respects color switcher)
function getPrimaryColor() {
  return getCssVar('--bs-primary') || '#4f46e5'
}

// Chart color palette
function getChartColors() {
  return {
    primary: getPrimaryColor(),
    success: getCssVar('--bs-success') || '#10b981',
    info: getCssVar('--bs-info') || '#0ea5e9',
    warning: getCssVar('--bs-warning') || '#f59e0b',
    danger: getCssVar('--bs-danger') || '#ef4444',
    secondary: getCssVar('--bs-secondary') || '#64748b'
  }
}

// Common chart options for dark/light mode compatibility
function getCommonOptions() {
  const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark'
  const textColor = isDark ? '#94a3b8' : '#64748b'
  const gridColor = isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(100, 116, 139, 0.1)'

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor,
          usePointStyle: true,
          padding: 20
        }
      }
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor }
      },
      y: {
        ticks: { color: textColor },
        grid: { color: gridColor }
      }
    }
  }
}

// Initialize all charts on the page
export function initCharts() {
  const colors = getChartColors()
  const options = getCommonOptions()

  // Line Chart
  const lineCtx = document.getElementById('lineChart')
  if (lineCtx) {
    lineCtx.innerHTML = ''
    const canvas = document.createElement('canvas')
    lineCtx.appendChild(canvas)

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Revenue',
          data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
          borderColor: colors.primary,
          backgroundColor: colors.primary + '20',
          tension: 0.4,
          fill: true
        }, {
          label: 'Orders',
          data: [8000, 12000, 10000, 18000, 15000, 22000, 20000],
          borderColor: colors.success,
          backgroundColor: 'transparent',
          tension: 0.4
        }]
      },
      options: {
        ...options,
        plugins: {
          ...options.plugins,
          legend: {
            ...options.plugins.legend,
            position: 'top'
          }
        }
      }
    })
  }

  // Bar Chart
  const barCtx = document.getElementById('barChart')
  if (barCtx) {
    barCtx.innerHTML = ''
    const canvas = document.createElement('canvas')
    barCtx.appendChild(canvas)

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Sales',
          data: [65, 59, 80, 81, 56, 72],
          backgroundColor: colors.primary,
          borderRadius: 4
        }, {
          label: 'Expenses',
          data: [28, 48, 40, 39, 36, 45],
          backgroundColor: colors.secondary,
          borderRadius: 4
        }]
      },
      options
    })
  }

  // Doughnut Chart
  const doughnutCtx = document.getElementById('doughnutChart')
  if (doughnutCtx) {
    doughnutCtx.innerHTML = ''
    const canvas = document.createElement('canvas')
    doughnutCtx.appendChild(canvas)

    new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        datasets: [{
          data: [55, 35, 10],
          backgroundColor: [colors.primary, colors.success, colors.warning],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }

  // Pie Chart
  const pieCtx = document.getElementById('pieChart')
  if (pieCtx) {
    pieCtx.innerHTML = ''
    const canvas = document.createElement('canvas')
    pieCtx.appendChild(canvas)

    new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Sales', 'Marketing', 'Support'],
        datasets: [{
          data: [45, 30, 25],
          backgroundColor: [colors.primary, colors.info, colors.danger],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }

  // Polar Area Chart
  const polarCtx = document.getElementById('polarChart')
  if (polarCtx) {
    polarCtx.innerHTML = ''
    const canvas = document.createElement('canvas')
    polarCtx.appendChild(canvas)

    new Chart(canvas, {
      type: 'polarArea',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          data: [11, 16, 7, 14],
          backgroundColor: [
            colors.primary + '80',
            colors.success + '80',
            colors.warning + '80',
            colors.info + '80'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          r: {
            ticks: {
              display: false
            },
            grid: {
              color: getCommonOptions().scales.x.grid.color
            }
          }
        }
      }
    })
  }

  // Area Chart (Full Width)
  const areaCtx = document.getElementById('areaChart')
  if (areaCtx) {
    areaCtx.innerHTML = ''
    const canvas = document.createElement('canvas')
    areaCtx.appendChild(canvas)

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Revenue',
          data: [30000, 35000, 32000, 40000, 45000, 42000, 50000, 55000, 52000, 60000, 65000, 70000],
          borderColor: colors.primary,
          backgroundColor: colors.primary + '20',
          tension: 0.4,
          fill: true
        }, {
          label: 'Profit',
          data: [15000, 18000, 16000, 22000, 25000, 23000, 28000, 32000, 30000, 35000, 38000, 42000],
          borderColor: colors.success,
          backgroundColor: colors.success + '20',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        ...options,
        plugins: {
          ...options.plugins,
          legend: {
            ...options.plugins.legend,
            position: 'top'
          }
        }
      }
    })
  }

  // Dashboard Revenue Chart (on main dashboard)
  const dashboardChartCtx = document.getElementById('dashboardChart')
  if (dashboardChartCtx) {
    dashboardChartCtx.innerHTML = ''
    const canvas = document.createElement('canvas')
    dashboardChartCtx.appendChild(canvas)

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Revenue',
          data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
          borderColor: colors.primary,
          backgroundColor: colors.primary + '20',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        ...options,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }

  // Traffic Sources Chart (dashboard doughnut)
  const trafficChartCtx = document.getElementById('trafficChart')
  if (trafficChartCtx) {
    trafficChartCtx.innerHTML = ''
    const canvas = document.createElement('canvas')
    trafficChartCtx.appendChild(canvas)

    new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Direct', 'Organic', 'Referral', 'Social'],
        datasets: [{
          data: [42, 28, 18, 12],
          backgroundColor: [colors.primary, colors.success, colors.warning, colors.info],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }

  // ==========================================
  // Analytics Dashboard Charts
  // ==========================================

  // Analytics Traffic Overview Chart
  const analyticsTrafficCtx = document.getElementById('analyticsTrafficChart')
  if (analyticsTrafficCtx) {
    analyticsTrafficCtx.innerHTML = ''
    const canvas = document.createElement('canvas')
    analyticsTrafficCtx.appendChild(canvas)

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Page Views',
          data: [18500, 22400, 19800, 28900, 25600, 32100, 29400],
          borderColor: colors.primary,
          backgroundColor: colors.primary + '20',
          tension: 0.4,
          fill: true
        }, {
          label: 'Unique Visitors',
          data: [12400, 15200, 13800, 19200, 17400, 21800, 19800],
          borderColor: colors.success,
          backgroundColor: 'transparent',
          tension: 0.4
        }]
      },
      options: {
        ...options,
        plugins: {
          ...options.plugins,
          legend: {
            ...options.plugins.legend,
            position: 'top'
          }
        }
      }
    })
  }

  // Analytics Traffic Sources Chart
  const analyticsSourcesCtx = document.getElementById('analyticsSourcesChart')
  if (analyticsSourcesCtx) {
    analyticsSourcesCtx.innerHTML = ''
    const canvas = document.createElement('canvas')
    analyticsSourcesCtx.appendChild(canvas)

    new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Organic Search', 'Direct', 'Referral', 'Social'],
        datasets: [{
          data: [38, 26, 22, 14],
          backgroundColor: [colors.primary, colors.success, colors.warning, colors.info],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }

  // ==========================================
  // E-commerce Dashboard Charts
  // ==========================================

  // E-commerce Sales Overview Chart
  const ecommerceSalesCtx = document.getElementById('ecommerceSalesChart')
  if (ecommerceSalesCtx) {
    ecommerceSalesCtx.innerHTML = ''
    const canvas = document.createElement('canvas')
    ecommerceSalesCtx.appendChild(canvas)

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Revenue',
          data: [28500, 34200, 31800, 42900],
          backgroundColor: colors.primary,
          borderRadius: 4
        }, {
          label: 'Orders',
          data: [18200, 22400, 20100, 28600],
          backgroundColor: colors.success,
          borderRadius: 4
        }]
      },
      options
    })
  }

  // ==========================================
  // SaaS Dashboard Charts
  // ==========================================

  // SaaS Revenue Growth Chart
  const saasRevenueCtx = document.getElementById('saasRevenueChart')
  if (saasRevenueCtx) {
    saasRevenueCtx.innerHTML = ''
    const canvas = document.createElement('canvas')
    saasRevenueCtx.appendChild(canvas)

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'MRR',
          data: [52000, 55400, 58200, 62800, 65400, 69200, 72800, 75600, 78400, 81200, 82800, 84254],
          borderColor: colors.primary,
          backgroundColor: colors.primary + '20',
          tension: 0.4,
          fill: true
        }, {
          label: 'New Revenue',
          data: [4200, 3800, 4600, 5200, 4800, 5400, 4200, 5800, 4600, 5200, 4400, 5800],
          borderColor: colors.success,
          backgroundColor: 'transparent',
          tension: 0.4
        }]
      },
      options: {
        ...options,
        plugins: {
          ...options.plugins,
          legend: {
            display: false
          }
        }
      }
    })
  }

  // SaaS Subscription Plans Chart
  const saasPlansCtx = document.getElementById('saasPlansChart')
  if (saasPlansCtx) {
    saasPlansCtx.innerHTML = ''
    const canvas = document.createElement('canvas')
    saasPlansCtx.appendChild(canvas)

    new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Enterprise', 'Professional', 'Starter'],
        datasets: [{
          data: [54, 34, 12],
          backgroundColor: [colors.primary, colors.success, colors.warning],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }

  // ==========================================
  // Finance Dashboard Charts
  // ==========================================

  // Finance Cash Flow Chart
  const financeCashflowCtx = document.getElementById('financeCashflowChart')
  if (financeCashflowCtx) {
    financeCashflowCtx.innerHTML = ''
    const canvas = document.createElement('canvas')
    financeCashflowCtx.appendChild(canvas)

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Income',
          data: [95000, 108000, 102000, 118000, 125000, 132000, 128000, 142000, 138000, 148000, 142847, 155000],
          backgroundColor: colors.success,
          borderRadius: 4
        }, {
          label: 'Expenses',
          data: [58000, 62000, 55000, 68000, 72000, 65000, 70000, 75000, 68000, 72000, 68234, 74000],
          backgroundColor: colors.danger,
          borderRadius: 4
        }]
      },
      options
    })
  }
}

// Re-initialize charts when theme changes (to update colors)
export function setupChartThemeObserver() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-bs-theme') {
        // Small delay to let CSS variables update
        setTimeout(initCharts, 50)
      }
    })
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-bs-theme']
  })
}

// Export for use
export default { initCharts, setupChartThemeObserver }
