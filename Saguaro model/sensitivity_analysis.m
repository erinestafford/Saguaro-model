function [sensitivity, te3] = sensitivity_analysis(Q,params,param_name)
params.(param_name) = params.(param_name);

epsilon = 0.01 * params.(param_name);
params1 = params;
params2 = params;

params1.(param_name) = params.(param_name) + epsilon;
params2.(param_name) = params.(param_name) - epsilon;

te1 = Q(params1);
te2 = Q(params2);
te3 = Q(params);

t = (te1-te2)/(2*epsilon);

sensitivity = t * params.(param_name)/te3;


end