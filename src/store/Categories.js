const ColorStyles = {
    'tree': '#e8c7c7',
    'graph': '#d8a3a3',
    'treemap': '#c87e7e',
    'hierarchical_edge_bundling': '#b85a5a',
    'sunburst_icicle': '#a93636',
    'line_chart': '#d8bea3',
    'parallel_coordinate': '#c8a47e',
    'polar_plot': '#b88a5a',
    'storyline': '#a97036',
    'flow_diagram': '#c8c87e',
    'chord_diagram': '#b8b85a',
    'sankey_diagram': '#a9a936',
    'map': '#70a936',
    'heatmap': '#7ec87e',
    'unit_visualization': '#5ab85a',
    'glyph_based': '#36a936',
    'scatterplot': '#36a970',
    'matrix': '#7ec8c8',
    'table': '#5ab8b8',
    'small_multiple': '#36a9a9',
    'pie_chart': '#7ea4c8',
    'sector_chart': '#5a8ab8',
    'donut_chart': '#3670a9',
    'error_bar': '#7e7ec8',
    'box_plot': '#5a5ab8',
    'stripe_graph': '#3636a9',
    'bar_chart': '#7036a9',
    'area_chart': '#b85ab8',
    'proportional_area_chart': '#a936a9',
    'word_cloud': '#a93670',
    'NoVis': '#d3d3d3'
}


const TextTranslate = {
    'line_chart': 'line chart',
    'scatterplot': 'scatterplot',
    'tree': 'tree',
    'heatmap': 'heatmap',
    'treemap': 'treemap',
    'graph': 'graph',
    'map': 'map',
    'bar_chart': 'bar chart',
    'small_multiple': 'small multiple',
    'matrix': 'matrix',
    'flow_diagram': 'flow diagram',
    'table': 'table',
    'sunburst_icicle': 'sunburst icicle',
    'parallel_coordinate': 'parallel coordinate',
    'box_plot': 'box plot',
    'error_bar': 'error bar',
    'glyph_based': 'glyph based',
    'area_chart': 'area chart',
    'pie_chart': 'pie chart',
    'sector_chart': 'sector chart',
    'word_cloud': 'word cloud',
    'proportional_area_chart':
        'proportional area chart',
    'unit_visualization': 'unit visualization',
    'donut_chart': 'donut chart',
    'sankey_diagram': 'sankey diagram',
    'hierarchical_edge_bundling': 'hierarchical edge bundling',
    'chord_diagram': 'chord diagram',
    'stripe_graph': 'stripe graph',
    'polar_plot': 'polar plot',
    'storyline': 'storyline',
    'NoVis': 'no visualization'
}

const ReverseTextTranslate = {};
Object.keys(TextTranslate).forEach(key => ReverseTextTranslate[TextTranslate[key]] = key);

export { ColorStyles, TextTranslate, ReverseTextTranslate };
