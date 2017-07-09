function [S_a] = Q1_Sa (params, output, time)
fn = @(t,y)basicLifeCycle(t,y,params);
[T,Y] = ode23s(fn,time, output);
S_a = Y(end,2);
end