
function [] = plot_sensitivity(Q_fn, param_name, param_range, params)
 
    for i = 1:length(param_range) 
       params.(param_name) = param_range(i);
       q = Q_fn(params);
       hold on;
       if numel(q) == 0
           y(i) = NaN;
       else
           y(i) = q;
       end
    end
    
    plot(param_range,y);
    xlabel(strcat(param_name, ' value'));
    ylabel('quantity value')
end