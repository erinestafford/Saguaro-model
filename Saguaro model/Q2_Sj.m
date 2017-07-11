function [S_j] = Q2_Sj (params, out, t)
% fn = @(t,y)basicLifeCycle(t,y,params);
fn = @(t,y)basicLifeCycleSeasonality(t,y,params);
[time,output] = ode23s(fn,t , out);
S_j = output(end,1);
end