clear all; close all;
%% Params
s_j0 = 100;
s_a0 = 150;
t0 = 200;
b0 = 500;
space = 10000; %1 hectare, in meters
param_struct= ...
{'r1',4.725;%make function of time?
'k1', 165;
'b',1;
'gamma', 1/35;
'phi',0.012;
'k2',435;
'muj', .042;
'mua',1/140;
'alpha1', .000001;
'alpha2',1/100;
'e', .113;
'omega',.35;
'k3', 60000; %max density per hectare
'mub',1/3;
'theta_j', 1/(1111*250*(1-.01));%(mortality of species)/(min buffel pop)( fire frequency)
'theta_a', 0.65/(1111*250*(1-.01));
'theta_t', 0.5/(1111*250*(1-.01));
}';
params = struct(param_struct{:});

%% Simulations
%original
 y0 = [s_j0 s_a0 t0];
 tspan = [0 400];
 fn = @(t,y)basicLifeCycle(t,y,params);
 [T,Y] = ode23s(fn, tspan, y0);
%  figure('DefaultAxesFontSize', 12)
%  plot(T,Y(:,1),'LineWidth', 2);
%  hold on
%  plot(T,Y(:,2),'LineWidth', 2);
%  plot(T,Y(:,3),'LineWidth', 2);
%  xlabel('Time in Years');
%  ylabel('Population')
% legend('S_j','S_a','T')
% 
%  y0 = [s_j0 s_a0 t0];
%  tspan = [0 400];
%  fn = @(t,y)basicLifeCycleSeasonality(t,y,params);
%  [T,Y] = ode23s(fn, tspan, y0);
%  figure('DefaultAxesFontSize', 12)
%  plot(T,Y(:,1),'LineWidth', 2);
%  hold on
%  plot(T,Y(:,2),'LineWidth', 2);
%  plot(T,Y(:,3),'LineWidth', 2);
%  xlabel('Time in Years');
%  ylabel('Population')
% legend('S_j','S_a','T')

% buffelgrass
%  y0 = [s_j0 s_a0 t0 b0];
%  tspan = [0 300];
%  fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%  [T,Y] = ode23s(fn, tspan, y0);
%  figure('DefaultAxesFontSize', 12)
%   plot(T,Y(:,1),'LineWidth', 2);
%   hold on
%   plot(T,Y(:,2),'LineWidth', 2);
%   plot(T,Y(:,3),'LineWidth', 2);
%  %plot(T,Y(:,4),'LineWidth',2);
%  xlabel('Time in Years');
%  ylabel('Population')
% legend('S_j','S_a','T')
%% Sensitivity Analysis
Q1 = @(param)Q1_Sa (param,y0, T);
sensitivity_k2_a  = sensitivity_analysis(Q1,params,'k2');
Q1 = @(param)Q1_Sa (param,y0, T);
sensitivity_alpha2_a  = sensitivity_analysis(Q1,params,'alpha2');

Q2 = @(param)Q2_Sj (param,y0, T);
sensitivity_k2_j  = sensitivity_analysis(Q2,params,'k2');
Q2 = @(param)Q2_Sj (param,y0, T);
sensitivity_alpha2_j  = sensitivity_analysis(Q2,params,'alpha2');

Q3 = @(param)Q3_T (param,y0, T);
sensitivity_k2_t  = sensitivity_analysis(Q3,params,'k2');
Q3 = @(param)Q3_T (param,y0, T);
sensitivity_alpha2_t  = sensitivity_analysis(Q3,params,'alpha2');

figure()
plot_sensitivity(Q3,'muj',[0.2:.001:0.8],params)
title('\mu_j w.r.t. T')