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
}';
params = struct(param_struct{:});

%% Simulations
% original
%  y0 = [s_j0 s_a0 t0];
%  tspan = [0 300];
%  fn = @(t,y)basicLifeCycle(t,y,params);
%  [T,Y] = ode23s(fn, tspan, y0);
%  subplot(1,2,1)
%  plot(T,Y(:,1),'LineWidth', 2);
%  hold on
%  plot(T,Y(:,2),'LineWidth', 2);
%  plot(T,Y(:,3),'LineWidth', 2);
%  xlabel('Time in Years');
%  ylabel('Population')
%  legend('S_j','S_a','T')

%% varying params
% params.alpha2 = 1/25;
%  fn = @(t,y)basicLifeCycle(t,y,params);
%  [T,Y] = ode23s(fn, tspan, y0);
%  plot(T,Y(:,1),'b--','LineWidth', 2);
%  plot(T,Y(:,2),'r--','LineWidth', 2);
%  plot(T,Y(:,3),'y--','LineWidth', 2);
%  
%  params.alpha2 = 1/200;
%  fn = @(t,y)basicLifeCycle(t,y,params);
%  [T,Y] = ode23s(fn, tspan, y0);
%  plot(T,Y(:,1),'b*-','LineWidth', 2);
%  plot(T,Y(:,2),'r*-','LineWidth', 2);
%  plot(T,Y(:,3),'y*-','LineWidth', 2);
% 
% 
% legend('S_j','S_a','T','S_j25yr','S_a25yr','T25yr', 'S_j200yr','S_a200yr','T_200yr')


%% Seasonality
%  y0 = [s_j0 s_a0 t0];
%  tspan = [0 300];
%  fn = @(t,y)basicLifeCycleSeasonality(t,y,params);
%  [T,Y] = ode23s(fn, tspan, y0);
%  subplot(1,2,2)
%  plot(T,Y(:,1),'LineWidth', 2);
%  hold on
%  plot(T,Y(:,2),'LineWidth', 2);
%  plot(T,Y(:,3),'LineWidth', 2);
%  xlabel('Time in Years');
%  ylabel('Population')
%  legend('S_j','S_a','T')
%% vary params
 y0 = [s_j0 s_a0 t0];
 tspan = [0 400];
 rVals = .001:.001:5;
for i= 1:length(rVals)
    params.r1 = rVals(i);
    fn = @(t,y)basicLifeCycle(t,y,params); %not Seasonal
    [T,Y1] = ode23s(fn, tspan, y0);
    Y(1) = Y1;
end

for i= 1:length(rVals)
    params.r1 = rVals(i);
    fn = @(t,y)basicLifeCycle(t,y,params); %not Seasonal
    [T,Y2] = ode23s(fn, tspan, y0);
    Y(2) = Y2;
end

for i= 1:length(rVals)
    params.r1 = rVals(i);
    fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
    [T,Y3] = ode23s(fn, tspan, y0);
    Y(3) = Y3;
end
plot(T,Y)
xlabel('Populations')
ylabel('Time in Years')
legend('S_j','S_a','T')
%% buffelgrass
%  yinit = [s_j0 s_a0 t0 b0];
%  tspan = [0 400];
%  fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%  [T,Y] = ode23s(fn, tspan, y0);
% subplot(1,2,1)
%   plot(T,Y(:,1),'LineWidth', 2);
%   hold on
%   plot(T,Y(:,2),'LineWidth', 2);
%   plot(T,Y(:,3),'LineWidth', 2);
% %  %plot(T,Y(:,4),'LineWidth',2);
%  xlabel('Time in Years');
%  ylabel('Population')
% legend('S_j','S_a','T')

%% Vary Buffel params - theta
%vary theta

%thetaVals = 0:.0000001:.005;
% subplot(1,3,1)
% for i= 1:length(thetaVals)
%     params.theta_j = thetaVals(i);
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, yinit);
%     y1(i) = Y(end,1);
% end
% plot(thetaVals,y1,'LineWidth', 2);
% xlabel('Value of \theta_j');
% ylabel('Juvenile Saguaro Final Population');
% 
% subplot(1,3,2)
% for i= 1:length(thetaVals)
%     params.theta_j = thetaVals(i);
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, yinit);
%     y2(i) = Y(end,2);
% end
% plot(thetaVals,y2,'LineWidth', 2);
% xlabel('Value of \theta_j');
% ylabel('Adult Saguaro Final Population');
% title('Effects of Varying \theta_j from 0 to 0.005')
% 
% subplot(1,3,3)
% 
% for i= 1:length(thetaVals)
%     params.theta_j = thetaVals(i);
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     y3(i) = Y(end,3);
%     [T,Y] = ode23s(fn, tspan, yinit);
% end
% plot(thetaVals,y3,'LineWidth', 2);
% xlabel('Value of \theta_j');
% ylabel('Palo Verde Final Population');
% 
% figure()
% plot(T,Y);
% legend();
%% Vary buffel grass growth

% omegaVals = 0:.01:3;
% subplot(1,3,1)
% for i= 1:length(omegaVals)
%     params.omega = omegaVals(i);
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(i) = Y(end,1);
% end
% plot(omegaVals,y,'LineWidth', 2);
% xlabel('Value of \omega');
% ylabel('Juvenile Saguaro Popualtion');
% 
% subplot(1,3,2)
% for i= 1:length(omegaVals)
%     params.omega = omegaVals(i);
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(i) = Y(end,2);
% end
% plot(omegaVals,y,'LineWidth', 2);
% xlabel('Value of \omega');
% ylabel('Adult Saguaro Popualtion');
% title('Effects of Varying \omega from 0 to 3');
% 
% subplot(1,3,3)
% for i= 1:length(omegaVals)
%     params.omega = omegaVals(i);
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(i) = Y(end,3);
% end
% plot(omegaVals,y,'LineWidth', 2);
% xlabel('Value of \omega');
% ylabel('Palo Verde Popualtion');

%Vary harvesting
% mubVals = 0:(1/50):(1/2);
% params.mub = 1/3;
% subplot(1,3,1)
% for i= 1:length(mubVals)
%     params.mub = mubVals(i);
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(i) = Y(end,1);
% end
% plot(mubVals,y,'LineWidth', 2);
% ylabel('Juvenile Saguaro Popualtion');
% xlabel('Value of \mu_B');
% 
% params.mub = 1/3;
% subplot(1,3,2)
% for i= 1:length(mubVals)
%     params.mub = mubVals(i);
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(i) = Y(end,2);
% end
% plot(mubVals,y,'LineWidth', 2);
% title('Effects of Varying \mu_b from 0 to 1/2');
% ylabel('Adult Saguaro Popualtion');
% xlabel('Value of \mu_B');
% 
% params.mub = 1/3;
% subplot(1,3,3)
% for i= 1:length(mubVals)
%     params.mub = mubVals(i);
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(i) = Y(end,3);
% end
% plot(mubVals,y,'LineWidth', 2);
% xlabel('Value of \mu_B');
% ylabel('Palo Verde Popualtion');

%% Vary B0
% B0vals = 0:500:60000;
% subplot(1,3,1)
% for i= 1:length(B0vals)
%     y0 = [s_j0 s_a0 t0 B0vals(i)];
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(i) = Y(end,1);
% end
% plot(B0vals,y,'LineWidth', 2);
% ylabel('Juvenile Saguaro Popualtion');
% xlabel('Value of B0');
% 
% subplot(1,3,2)
% for i= 1:length(B0vals)
%     y0 = [s_j0 s_a0 t0 B0vals(i)];
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(i) = Y(end,2);
% end
% plot(B0vals,y,'LineWidth', 2);
% title('Effects of Varying B0 from 0 to 60000');
% ylabel('Adult Saguaro Popualtion');
% xlabel('Value of B0');
% 
% subplot(1,3,3)
% for i= 1:length(B0vals)
%     y0 = [s_j0 s_a0 t0 B0vals(i)];
%     fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%     [T,Y] = ode23s(fn, tspan, y0);
%     y(i) = Y(end,3);
% end
% plot(B0vals,y,'LineWidth', 2);
% xlabel('Value of B0');
% ylabel('Palo Verde Popualtion');
%% Buffelgrass Simulations
%  y0 = [s_j0 s_a0 t0 b0];
%  tspan = [0 500];
%  fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%  [T,Y] = ode23s(fn, tspan, y0);
%  plot(T,Y(:,4),'LineWidth',2);
%  xlabel('Time in Years');
%  ylabel('Buffelgrass Population')
%  hold on 
 %increase mu_b harvesting
%  params.mub = 1/3 + .01/3;
%  fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%  [T,Y] = ode23s(fn, tspan, y0);
%  plot(T,Y(:,4),'LineWidth',2);
 Q4 = @(param)Q4_B (param,yinit, T);
%  sensitivity_mub  = sensitivity_analysis(Q4,params,'mub')

%  params.mub = 1/3;
%  params.omega = params.omega - params.omega*.01;
%  fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params); %not Seasonal
%  [T,Y] = ode23s(fn, tspan, y0);
%  plot(T,Y(:,4),'LineWidth',2);
%  Q4 = @(param)Q4_B (param,y0, T);
%  sensitivity_omega  = sensitivity_analysis(Q4,params,'omega')
 
%  legend('baseline', 'increase \mu_B', 'decrease omega')
 
%% Sensitivity Analysis
Q1 = @(param)Q1_Sa (param,yinit, T);
% sensitivity_thetaj_a  = sensitivity_analysis(Q1,params,'theta_j')
% sensitivity_thetaa_a  = sensitivity_analysis(Q1,params,'theta_a')
% sensitivity_thetat_a  = sensitivity_analysis(Q1,params,'theta_t')
% sensitivity_mub_a  = sensitivity_analysis(Q1,params,'mub')
% sensitivity_omega_a  = sensitivity_analysis(Q1,params,'omega')
%  
Q2 = @(param)Q2_Sj (param,yinit, T);
% sensitivity_thetaj_j  = sensitivity_analysis(Q2,params,'theta_j')
% sensitivity_thetaa_j  = sensitivity_analysis(Q2,params,'theta_a')
% sensitivity_thetat_j  = sensitivity_analysis(Q2,params,'theta_t')
% sensitivity_mub_j  = sensitivity_analysis(Q2,params,'mub')
% sensitivity_omega_j  = sensitivity_analysis(Q2,params,'omega')
% 
Q3 = @(param)Q3_T (param,yinit, T);
% sensitivity_thetaj_t  = sensitivity_analysis(Q3,params,'theta_j')
% sensitivity_thetaa_t  = sensitivity_analysis(Q3,params,'theta_a')
% sensitivity_thetat_t  = sensitivity_analysis(Q3,params,'theta_t')
% sensitivity_mub_t  = sensitivity_analysis(Q3,params,'mub')
% sensitivity_omega_t  = sensitivity_analysis(Q3,params,'omega')
Q4 = @(param)Q4_B(param,yinit,T);
% sens_mub = sensitivity_analysis(Q4,params,'mub')
% sens_omega = sensitivity_analysis(Q4,params,'omega')
% figure()
% plot_sensitivity(Q1,'mua',[0.2:.01:0.8],params)
% title('mu_a w.r.t. S_a')

% figure()
% contour_plot(Q2,params, linspace(0,3,40), linspace(0,.5,40),'omega','theta_j');

