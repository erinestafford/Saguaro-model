clear all; close all;
%% Params
s_j0 = 500;
s_a0 = 350;
t0 = 10;
b0 = 1000;
param_struct= ...
{'r1',4.725;%
'k1', 250;%fixed
'b',.8;%fixed
'gamma', 1/35;%fixed
'phi',.07;%
'k2',(565+1350)/2;%fixed
'muj', .042; %
'mua',1/140;%fixed
'alpha1', .000001;%fixed
'rho',(1/(80-35))*(1/100)*.8;%
'e', .113;%fixed
'omega',.35; %focus on this param down for sensitivity
'k3', 60000; %fixed
'mub',1/3;%vary
'theta_j',1/(1111*250*(1-.0027));%vary (mortality of species)/(min buffel pop)( fire frequency)
'theta_a', 0.7/(1111*250*(1-.0027));%vary
'theta_t', 0.63/(1111*250*(1-.0027));%vary
'sigma',(((1/(80-35))*(1/100)*.8 )/.07)*(565+1350)/2;%(rho/phi)k2
}';
params = struct(param_struct{:});

%% condidtions
rd2 = calc_Rd2(params)
greaterThanZero = ((params.b*params.k2*params.rho)/(params.e*params.r1*params.phi))-1;