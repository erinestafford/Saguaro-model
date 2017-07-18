clear all; close all;
%% Params
s_j0 = 200;
s_a0 = 150;
t0 = 300;
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
%% Existence Conditions
params.r1 = .02;
params.muj = .035;
params.mua = .000002;
params.alpha1 = .005;

rd1 = calc_Rd1(params)
rd2 = calc_Rd2(params)
E = params.e*params.mua/params.gamma;
A = params.alpha1 * (params.k2/params.sigma)*(rd1*E - params.sigma*params.b)
B = params.alpha1*(params.k1 + params.b*params.k2) -(params.mua+params.alpha1)*params.b*params.k2*(rd2 - 1) - rd1*(params.k2/params.sigma)*(E*(params.mua+params.alpha1) +params.mua)
C = (params.mua+params.alpha1)*(params.k1+params.b*params.k2)*(rd2-1)
%shouldBeOppositeSignOfCForOneRoot = A+B+C
shouldBeSameSignAsAAndCForTwoRoot = 2*A + B
ShouldBeGreaterThan0ForTwoRoot = (B*B) - (4*A*C)

%% Sims - baseline (has one root)
%  y0 = [s_j0 s_a0 t0];
%  tspan = [0 400];
%  fn = @(t,y)basicLifeCycle(t,y,params); %not Seasonal
%  [T,Y] = ode45(fn, tspan, y0);
%   plot(T,Y(:,1),'LineWidth', 2);
%   hold on
%   plot(T,Y(:,2),'LineWidth', 2);
%   plot(T,Y(:,3),'LineWidth', 2);
%  xlabel('Time in Years');
%  ylabel('Population')
% legend('S_j','S_a','T')

%% Sim - two root
%  y0 = [s_j0 s_a0 t0];
%  tspan = [0 400];
%  fn = @(t,y)basicLifeCycle(t,y,params); %not Seasonal
%  [T,Y] = ode45(fn, tspan, y0);
%   plot(T,Y(:,1),'LineWidth', 2);
%   hold on
%   plot(T,Y(:,2),'LineWidth', 2);
%   plot(T,Y(:,3),'LineWidth', 2);
%  xlabel('Time in Years');
%  ylabel('Population')
% legend('S_j','S_a','T')
%% Sims - Rd1 < 1 -no coexistence
% params.r1 = .01;
% params.muj = .3;
% rd1 = calc_Rd1(params)
% rd2 = calc_Rd2(params)
% E = params.e*params.mua/params.gamma;
% A = params.alpha1 * (params.k2/params.sigma)*(rd1*E - params.sigma*params.b)
% B = params.alpha1*(params.k1 + params.b*params.k2) -(params.mua+params.alpha1)*params.b*params.k2*(rd2 - 1) - rd1*(params.k2/params.sigma)*(E*(params.mua+params.alpha1) +params.mua)
% C = (params.mua+params.alpha1)*(params.k1+params.b*params.k2)*(rd2-1)
% shouldBeOppositeSignOfCForOneRoot = A+B+C
% shouldBeSameSignAsAForTwoRoot = 2*A + B
% ShouldBeGreaterThan0ForTwoRoot = (B*B) - (4*A*C)
%  y0 = [s_j0 s_a0 t0];
%  tspan = [0 400];
%  fn = @(t,y)basicLifeCycle(t,y,params); %not Seasonal
%  [T,Y] = ode45(fn, tspan, y0);
%   plot(T,Y(:,1),'LineWidth', 2);
%   hold on
%   plot(T,Y(:,2),'LineWidth', 2);
%   plot(T,Y(:,3),'LineWidth', 2);
%  xlabel('Time in Years');
%  ylabel('Population')
% legend('S_j','S_a','T')